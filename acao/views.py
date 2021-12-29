<<<<<<< HEAD
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

=======
>>>>>>> 91526e6563367c49e2fc3f51999336375182707c
from django.shortcuts import render
import pandas as pd
import numpy as np

import json
from django.http import JsonResponse

import yfinance as yf
import pandas_datareader as pdr

from scipy import stats

from sklearn.metrics import  mean_absolute_error

<<<<<<< HEAD
from sklearn.metrics import mean_squared_error
from math import sqrt

from keras.models import  Sequential
from keras.layers import Dense, Dropout, LSTM
from sklearn.preprocessing import StandardScaler

from datetime import date


=======
from datetime import date

>>>>>>> 91526e6563367c49e2fc3f51999336375182707c
# Create your views here.

def home(request):
    return render(request, 'acao/home.html', {})

<<<<<<< HEAD
def predict(request):
    indice = request.GET['indice']
    codigo = [indice]

    dataset =  get_acao(codigo)
    
    #print(dataset)


    #dataset = pd.read_csv("F:/preco_acao/acao/media/petr4.csv")
    #return render(request, 'acao/home.html', {})

    #dataset = pd.DataFrame(dataset)
    
    prev_mc = previsao_monte_carlo(dataset)
    prev_mc = json.dumps(prev_mc)
    
    prev_keras_lstm = keras_lstm(dataset)
    prev_keras_lstm = json.dumps(prev_keras_lstm)
    #mc_real = prev_mc['valor_real']
    print(prev_keras_lstm)
    #real = json.dumps(monte_carlo_real)
    
    return render(request, 'acao/home.html', context={"mc_json":json.dumps(prev_mc), 'lstm_json':json.dumps(prev_keras_lstm)}) #usar esse modelo

def buscar_acao(request):
    #yf.pdr_override()

    indice = request.GET['indice']
=======

def buscar_acao(request):
    yf.pdr_override()

    busca = request.GET['busca']
>>>>>>> 91526e6563367c49e2fc3f51999336375182707c

    #acao = pdr.get_data_yahoo(busca, start = '2015-01-01')['Close']
    
    acao = pd.read_csv("F:/preco_acao/acao/media/acao.csv")
    
    #converter para DateFrame
    acao = pd.DataFrame(acao)

    #apagar valores nulos
    acao.dropna(inplace=True) #remover
    acao = acao.rename(columns={'PETR3.SA': 'Close'}) #remover
    acao.set_index('Date', inplace=True)
    
    #resetar o index
    #acaodf.reset_index('Date', inplace=True)
    
    monte_carlo = previsao_monte_carlo(acao)
    monte_carlo_real = monte_carlo['valor_real']
    #real = json.dumps(monte_carlo_real)

    monte_carlo = json.dumps(monte_carlo)
    
    #return render(request, 'acao/teste.html', {'monte_carlo': monte_carlo})
   
    return render(request, 'acao/teste.html', context={"mcprev_json":json.dumps(monte_carlo)}) #usar esse modelo
    #return render(request, 'acao/teste.html', context={"mydata_json":json.dumps(real)}) #usar esse modelo
    #return JsonResponse(request, real)

<<<<<<< HEAD
def get_acao(codigo=[], periodo = 10):#padrão de 10 anos para o período
  yf.pdr_override()
  df = pd.DataFrame()
  for acao in codigo:
    df[acao] = yf.Ticker(acao).history(period = (str(periodo)+'y'))['Close']
    
  return df

'''
def buscar__acao(request):
    mydata = {'age':12}
    return render(request, 'acao/teste.html', context={"mydata_json": json.dumps(mydata)})
'''



def previsao_monte_carlo(dataset):
    #dataset = dataset.drop('Date', axis=1)
    dataset['Close'] = dataset

    dataset = (dataset['Close'])
   
=======
def buscar__acao(request):
    mydata = {'age':12}
    return render(request, 'acao/teste.html', context={"mydata_json": json.dumps(mydata)})




def previsao_monte_carlo(dataset):
    dataset = (dataset['Close'])
>>>>>>> 91526e6563367c49e2fc3f51999336375182707c
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

def get_acao_array(request):
    yf.pdr_override()

    array_acao = []
    array_acao.append(request.GET.get('indice1', False))
    array_acao.append(request.GET.get('indice2', False))

    if array_acao[0] != False and array_acao[1] != False:  
        acoes = pd.DataFrame()
        for acao in array_acao:
            acoes[acao] = pdr.get_data_yahoo(acao, start = '2015-01-01')['Close']

        acoes.dropna(inplace=True) #remover
        
        monte_carlo = []

        for indice in array_acao:
            acao = acoes.rename(columns={indice: 'Close'}) #remover
            #acao.set_index('Date', inplace=True)
            monte_carlo.append(indice)
            monte_carlo.append(previsao_monte_carlo(acao))

        return render(request, 'acao/get_acao_array.html', {'monte_carlo': monte_carlo})
   
        
    #if(indice1 in request.GET and indice2 in request.GET):
        
        #array = [request.GET.get('indice1', False) and request.GET.get('indice2', False)]
        #print('aqui')
    
    

<<<<<<< HEAD
    return render(request, 'acao/get_acao_array.html', {})


#previsao com keras LSTM

#converte em array de valores
def create_df(df, steps=1):
  dataX, dataY = [], []
  for i in range(len(df)- steps - 1):
    a = df[i:(i+steps), 0]
    dataX.append(a)
    dataY.append(df[i + steps, 0])

  return np.array(dataX), np.array(dataY)

#Função para prever valores futuros keras LSTM
def previsao_futura_lstm(test, steps, scaler, model, df):  
  #previsao para os dias futuros
  len_teste = len(test)
  #pegar os últimos dias que são o tamanho do step
  dias_input_steps = len_teste - steps
  #transformar em array
  input_steps = test[dias_input_steps:]
  input_steps = np.array(input_steps).reshape(1,-1)
  #transformar em lista
  list_output_steps = list(input_steps)
  list_output_steps = list_output_steps[0].tolist()

  #looop para prever os proximos dias
  pred_output = []
  i = 0
  n_futuro = 90 #total de dias

  while(i < n_futuro):

    if(len(list_output_steps) > steps):
      input_steps = np.array(list_output_steps[1:])
      input_steps = input_steps.reshape(1, -1)
      input_steps = input_steps.reshape((1, steps, 1))
      pred = model.predict(input_steps, verbose=0)
      list_output_steps.extend(pred[0].tolist())
      list_output_steps = list_output_steps[1:]
      pred_output.extend(pred.tolist())
      i = i + 1

    else:
      input_steps = input_steps.reshape((1, steps, 1))
      pred = model.predict(input_steps, verbose=0)
      list_output_steps.extend(pred[0].tolist())
      pred_output.extend(pred.tolist())
      i = i+1

  #transforma a saida
  prev_tutura = scaler.inverse_transform(pred_output)
  prev_tutura = np.array(prev_tutura).reshape(1, -1)
  list_output_pred = list(prev_tutura)
  list_output_pred = prev_tutura[0].tolist()

  #pegar as datas das previsoes
  #dates = pd.to_datetime(df.index)
  #predict_dates = pd.date_range(list(dates)[-1] + pd.DateOffset(1), periods=n_futuro, freq='b').tolist()

  #Cria dataFrame de previsao
  #previsao_dates = []
  #for i in predict_dates:
    #previsao_dates.append(i.date())

  #df_previsao = pd.DataFrame({'Date': np.array(predict_dates), 'Close': list_output_pred})
  #df_previsao['Date'] = pd.to_datetime(df_previsao['Date'])

  #colocar a data com index
  #df_previsao = df_previsao.set_index(pd.DatetimeIndex(df_previsao['Date'].values))
  #df_previsao.drop('Date', axis=1, inplace=True)
  
  return list_output_pred


#Função LSTM
def keras_lstm(df):
  df_original = df.reset_index()
  prev_lstm = {}

  prev_futura_lstm = {}

  acoes = df_original.set_index(pd.DatetimeIndex(df_original['Date'].values))
  
  for acao in df:
    df_close = acoes[acao]
    df_close.dropna(inplace=True)


    if len(df_close) > 365: #minimo de dados para realizar a previsao
      #verificar a quantidade de linhas
      len_linhas = len(df_close)
      len_linha_treino = round(.80 * len_linhas)

      #normalizar os dados: importante para meu modelo não endender que um valor é mais importante que outro
      df_close = pd.DataFrame(df_close)
      scaler = StandardScaler()
      df_scaled = scaler.fit_transform(df_close)

      #separar treino e teste      
      train = df_scaled[:len_linha_treino]
      test = df_scaled[len_linha_treino:]

      #gerando dados de treino e teste
      steps = 15 #considerar os 15 valores para prever o 16
      X_train, Y_train = create_df(train, steps)
      X_test, Y_test = create_df(test, steps)
      
      #gerando os dados no formato do modelo
      X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1) #recriando os dados de treinamento - o 1 é a quantidades de fitware
      X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

      #montar as camadas da redes
      model = Sequential() #return_sequences=True - cria uma memomira para o modelo
      model.add(LSTM(35, return_sequences=True, input_shape=(steps, 1) )) #o 35 é a quantidade de neuronios
      model.add(LSTM(35, return_sequences=True)) #criar mais uma camada
      model.add(LSTM(35))
      model.add(Dropout(0.2)) #Dropout - para regularizar o modelo para evitar o Overfitting
      model.add(Dense(1))

      #compilar o modelo
      model.compile(optimizer='adam', loss='mse')

      #model.summary()

      #treinamento do modelo
      validation = model.fit(X_train, Y_train, validation_data=(X_test, Y_test), epochs=100, batch_size=15, verbose=0)

      #Fazendo a previsao
      prev = model.predict(X_test)
      prev = scaler.inverse_transform(prev) #inverter os valores de normalizado para o valor real


      y_teste = scaler.inverse_transform(test)
      y_teste = y_teste[steps:-1]
      y_teste = pd.Series(y_teste[:, 0])
      #accuracy = accuracy_score(y_teste, prev)
    
      previsao = pd.Series(prev[:, 0])
      rmse = sqrt(mean_squared_error(y_teste, previsao))

      prev_lstm[acao] = [
          pd.Series(prev[:, 0]).to_list(),
          y_teste.to_list(),
          rmse
      ]
      
      #realizar previsao futura
      prev_futura_lstm[acao] = previsao_futura_lstm(test, steps, scaler, model, df)
      
  lstm = {
      'validacao':  prev_lstm,
      'previsao': prev_futura_lstm
  }
  
  
    
    
  return lstm

=======
    return render(request, 'acao/get_acao_array.html', {})
>>>>>>> 91526e6563367c49e2fc3f51999336375182707c
