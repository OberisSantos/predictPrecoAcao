import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from django.shortcuts import render
import pandas as pd
import numpy as np

import json
from django.http import JsonResponse

import yfinance as yf
import pandas_datareader as pdr

from scipy import stats

from sklearn.metrics import  mean_absolute_error, mean_squared_error

from sklearn.model_selection import  train_test_split
from math import sqrt

from keras.models import  Sequential, load_model
from keras.layers import Dense, Dropout, LSTM
from sklearn.preprocessing import StandardScaler

from keras.callbacks import ReduceLROnPlateau, EarlyStopping, ModelCheckpoint

from datetime import date




# Create your views here.

def home(request):
    return render(request, 'acao/home.html', {})

def predict(request):
    indice = request.POST['indice']
    acao = indice.upper()
  
    #import sys 
    #sys.exit() #interroper

    indice = indice.strip()+'.SA'
    codigo = [indice]  

    

    dataset =  get_acao(codigo)

    #if(dataset.empty):
      #return JsonResponse({"success":False, 'msg': 'Ativo não encontrado'}, status=500)
    
    #pevisao para algoritmo de Monte Carlos
    #prev_mc = previsao_monte_carlo(dataset)
    prev_lstm = lstm(dataset)
    #prev_mc = json.dumps(prev_mc)

    #return JsonResponse({"success":True, 'msg': 'Funciona', "mc_json":prev_mc}, status=200)
    return JsonResponse({"success":True, "lstm_json":prev_lstm, 'acao':acao}, status=200)
    #return JsonResponse({"success":True}, status=200)
    
    #previsao para algoritmo do Keras LSTM
    #prev_keras_lstm = keras_lstm(dataset)
    #prev_keras_lstm = json.dumps(prev_keras_lstm)
    #mc_real = prev_mc['valor_real']
    #real = json.dumps(monte_carlo_real)
    
    #return render(request, 'acao/home.html', context={"mc_json":json.dumps(prev_mc), 'lstm_json':json.dumps(prev_keras_lstm)}) #usar esse modelo


def get_acao(codigo=[], periodo = 5):#padrão de 10 anos para o período
  yf.pdr_override()
  df = pd.DataFrame()
  for acao in codigo:
    df[acao] = yf.Ticker(acao).history(period = (str(periodo)+'y'))['Close']
    
  return df


def previsao_monte_carlo(dataset):
    #dataset = dataset.drop('Date', axis=1)
    dataset['Close'] = dataset

    dataset = (dataset['Close'])
   
    #dataset = dataset.to_list() #converter para lista
    #dataset = pd.DataFrame(dataset)
    dias_a_frente = 90
    simulacoes = 1000

    dataset_normalizado = dataset.copy()
    #print(dataset.iloc[0][1])
   
    tamanho_dataset = len(dataset)
    
    for i in range(tamanho_dataset):        
        dataset_normalizado[i] = dataset[i] / dataset[0]

    
    dataset_normalizado = dataset_normalizado
    

    dataset_taxa_retorno = np.log(1 + dataset_normalizado.pct_change())
    dataset_taxa_retorno.fillna(0, inplace=True)
    media = dataset_taxa_retorno.mean()
    variancia = dataset_taxa_retorno.var()

    drift = media - (0.5 * variancia)
    desvio_padrao = dataset_taxa_retorno.std()

    Z = stats.norm.ppf(np.random.rand(dias_a_frente, simulacoes)) #numeros aleatorios com multiplicador do desvio padrão
    retorno_diarios = np.exp(drift + desvio_padrao * Z)

    previsoes = np.zeros_like(retorno_diarios) #criar uma matriz com zeros

    previsao_teste = previsoes.copy()
    
    previsoes[0] = dataset[-1] #iniciar a previsao com u último valor 

   
    #calculo das previsoes
    for dia in range(1, dias_a_frente): #a previsao será com base no dia anterior multiplicado pelo retorno de cada dia.
        previsoes[dia] = previsoes[dia - 1] * retorno_diarios[dia]
    previsao = previsoes.T.tolist()

    #testar para escolher a melhor previsão
    previsao_teste[0] = dataset[-dias_a_frente]
    

    for dia in range(1, dias_a_frente): #a previsao será com base no dia anterior multiplicado pelo retorno de cada dia.
        previsao_teste[dia] = previsao_teste[dia - 1] * retorno_diarios[dia]
    #p_teste = previsao_teste.T.tolist()
    #melhor = melhor_simulacao_monte_carlo(previsao_teste.T, dataset)
    previsao_teste = pd.DataFrame(previsao_teste)
    #previsao para teste
   
    #dataset_teste = dataset.reset_index(level=None, drop=True).copy()
    dataset_teste = dataset.copy()
    dataset_teste = dataset_teste.iloc[-len(previsao_teste):]
    #inicio = dataset_teste.index[-len(previsao_teste)] 
  
    erros = [ ]

    for i in range(len(previsao_teste.T)):
        simulacao = previsao_teste[i][0:len(dataset_teste)]
        erros.append(mean_absolute_error(dataset_teste, simulacao))

    erro_menor = min(erros)
    erro_menor_index = erros.index(erro_menor)

    previsao_teste = previsao_teste[erro_menor_index].to_list()
   

    data_futura = pd.date_range(start = date.today(), periods = dias_a_frente, freq ='B') 
    previsao_futura = pd.DataFrame(data_futura)
    #previsao_futura['Previsao'] = pd.DataFrame(previsao[erro_menor_index])
    previsao_futura.columns = ['Date']
    previsao_futura['Previsao'] = pd.DataFrame(previsao[erro_menor_index])
    #previsao_futura.set_index('Date', inplace=True)
    

    dados = {
        'erro': erro_menor,
        'previsao_futura': previsao_futura['Previsao'].to_list(),
        'previsao_teste': previsao_teste,
        'valor_real': dataset_teste.to_list()
    }
    
    return dados


#previsao com rede neural recorrente lstm-keras
def lstm(df, n_futuro=90, steps=100):	
  df_original = df.reset_index() #resetar o index
  acoes = df_original.set_index(pd.DatetimeIndex(df_original['Date'].values))

  df_colunas = acoes.columns
  codigo = df_colunas[1] #pegar o código da ação

  df_close = acoes[codigo]
  df_close.dropna(inplace=True) #remover valores nulos

  #normalizar os dados: importante para meu modelo não endender que um valor é mais importante que outro
  df_close = pd.DataFrame(df_close)
  scaler = StandardScaler()
  df_scaled = scaler.fit_transform(df_close)

  #separar treino e teste   sendo 20% para teste  
  train, test = train_test_split(df_scaled, test_size=0.2, shuffle=False)

  #gerando dados de treino e teste
  steps = steps #considerar os 30 valores para prever o 31
  epochs = 100
  #Criar um função que retorna array para treinar e testar
  X_train, Y_train = create_df(train, steps)
  X_test, Y_test = create_df(test, steps)

  #gerando os dados no formato do modelo
  X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1) #recriando os dados de treinamento - o 1 é a quantidades de fitware
  X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

  #montar as camadas da redes
  model = Sequential() #return_sequences=True - cria uma memomira para o modelo
  #LSTM tipo de rede recorrente - Memoria de Longo prazo

  model.add(LSTM(35, return_sequences=True, input_shape=(steps, 1))) #o 35 é a quantidade de neuronios
  model.add(LSTM(35, return_sequences=True)) #criar mais uma camada
  model.add(LSTM(35))
  model.add(Dropout(0.2)) #Dropout - para regularizar o modelo para evitar o Overfitting
  model.add(Dense(1)) #camada de saída com 1 valor previsto

  #compilar o modelo
  model.compile(optimizer='adam', loss='mse')

  #stop no treinamento do modelo quando não tiver melhora
  '''reduce_lr = ReduceLROnPlateau(monitor='loss', factor=0.2,
                        patience=10, min_lr=0.001)
  es = EarlyStopping(monitor='loss', min_delta=1e-10, patience=15)
  #treinar o modelo com stop
  model.fit(X_train, Y_train, epochs=100, batch_size=30, verbose=0, callbacks=[es, reduce_lr])
  '''

  #treinar o modelo sem stop
  model.fit(X_train, Y_train, epochs=epochs, batch_size=steps, verbose=0, shuffle=False)

  #Salvar o modelo treinado
  model.save('acao/media/lstm/modeloTreinado.h5')

  #Realizar uma previsão para validar o modelo
  previsao_validacao = model.predict(X_test)

  #inverter os valores de normalizado para o valor real
  previsao_validacao = scaler.inverse_transform(previsao_validacao) 

  #criar um DataFrame como os valores real e os valores previsto para validar o modelo
  #pegar os valores real
  Y_real = Y_test.reshape(-1,1)
  #inverter os valores 
  Y_real = scaler.inverse_transform(Y_real)
  df_validacao = pd.DataFrame(previsao_validacao)
  df_validacao.rename(columns={0: 'previsao'}, inplace=True)
  df_validacao['data'] = df_close.index[-len(Y_real):]
  df_validacao['preco'] = Y_real

  #validacao = metrica(df_validacao)

  #continuar treinando o modelo como os dados usado para testar e assim prever os valores futuro
  '''checkpoint_filepath = '/tmp/checkpoint' #armazenar temporario
  model_checkpoint_callback = ModelCheckpoint(
    filepath=checkpoint_filepath, save_weights_only=True, monitor='loss', mode='max', save_best_only=True)
  '''
  #treinar novamenete o modelo com os demais dados
  #model.fit(X_test, Y_test, epochs=100, batch_size=30, verbose=0)

  #Reload model
  model = load_model('acao/media/lstm/modeloTreinado.h5')
  
  #remover o modelo salvo
  if os.path.exists('acao/media/lstm/modeloTreinado.h5'):
    os.remove('acao/media/lstm/modeloTreinado.h5')

  #treinar novamenete o modelo com os demais dados
  model.fit(X_test, Y_test, epochs=epochs, batch_size=steps, verbose=0, shuffle=False)

  #Realizar previsão para os dias futuro

  n_futuro = n_futuro #dias para o futuro
  prediction_list = X_test[-1:] #pegar os steps valores para prever o próximo

  for _ in range(n_futuro):
    x = prediction_list[-steps:]
    x = np.array(x)
    x = x.reshape((1, steps, 1))
    out = model.predict(x, batch_size=steps)[0][0] #pegar o valor previsto
    prediction_list = np.append(prediction_list, out) #adicionar o valor previsto no final da lista
    #limpar os dados
    model.reset_states()

  predict_futuro = prediction_list[steps:] #carregar somenente os n_futuro valores previsto

  #inverter os valores 
  predict_futuro = predict_futuro.reshape(-1,1)
  futuro_previsto = scaler.inverse_transform(predict_futuro)

  #criar um DataFrame com os valores futuro
  df_futuro = pd.DataFrame(futuro_previsto)
  df_futuro.rename(columns={0:'futuro'}, inplace=True)

  #criar datas referente aos valoes Real
  dates = pd.to_datetime(df_close.index[-len(Y_real):])
  #Datas para o futuro, considerar apenas dias úteis
  predict_dates = pd.date_range(list(dates)[-1] + pd.DateOffset(1), periods=n_futuro, freq='b').tolist()

  #Adicionar as datas ao DataFrame df_futuro
  df_futuro['data'] = predict_dates

  dados = {
    'previsao': df_validacao['previsao'].to_list(),
    'preco': df_validacao['preco'].to_list(),
    'data': df_validacao['data'].to_list(),
    #'validacao': validacao,
    'futuro': df_futuro['futuro'].to_list(),
    'data_futuro': df_futuro['data'].to_list(),
    #'metrica': metrica_treino
  }

  return dados

#converte em array de valores
def create_df(df, steps=1):
  dataX, dataY = [], []
  for i in range(len(df)- steps - 1):
    a = df[i:(i+steps), 0]
    dataX.append(a)
    dataY.append(df[i + steps, 0])

  return np.array(dataX), np.array(dataY)
