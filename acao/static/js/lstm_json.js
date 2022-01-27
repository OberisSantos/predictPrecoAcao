/*var xArray = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24', '2022-01-24'];
var yArray = [100.470799,100.825146,101.050026,101.169745];

var xArray2 = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24'];
var yArray2 = [102.470799,101.825146,101.050026,104.169745, 104.169745];
// Define Data
var data = [{
  x: xArray,
  y: yArray,
  mode:"lines"
}];
//var data = [
  //{x: xArray, y: yArray, mode:"lines", name:'Antes'},
  //{x: xArray2, y: yArray2, mode:"lines", name:'depois'}
//];
// Define Layout
var layout = {
  xaxis: {title: "Datas", range: [xArray[0], xArray[2]]},//range: [40, 160], 
  yaxis: {title: "Valor"},  //range: [5, 16],
  title: "House Prices vs. Size"
};

// Display using Plotly
Plotly.newPlot("real", data, layout);
*/

function criarTabelaReal(data, preco, previsao){
  var data = data;
  var preco = preco;
  var previsao = previsao;

  var corpo_tabela = document.querySelector("#tablereal");
  //var fim = data.length - 1;
  //for(var i=fim; i >fim - 30; i-- ){
  for(var i=0; i < 90; i++ ){
    //formatar a data
    //var date = data[i];
    //var dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    //Criar os elementos
    var linha = document.createElement("tr");
    var campo_data = document.createElement("td");
    var campo_preco = document.createElement("td");
    var campo_previsao = document.createElement("td");
    var campo_diferenca = document.createElement("td");
    var campo_porcentagem = document.createElement("td");
    //Criar estilo
    //corpo_tabela.className = "table";


    //Criar nós
    //var texto_data = document.createTextNode(dataFormatada);
    var texto_data = document.createTextNode(i+1);
    var texto_preco = document.createTextNode(parseFloat(preco[i]).toFixed(4));
    var texto_previsao = document.createTextNode(parseFloat(previsao[i]).toFixed(4));
    var diferenca = Math.abs(parseFloat(preco[i] - previsao[i]).toFixed(4));
    var texto_diferenca = document.createTextNode(diferenca);
    var porcentagem = parseFloat((diferenca * 100) /  preco[i]).toFixed(2);
    var texto_porcentagem = document.createTextNode(porcentagem);
    
    //vincular os dados aos elementos
    campo_data.appendChild(texto_data);
    campo_preco.appendChild(texto_preco);
    campo_previsao.appendChild(texto_previsao);
    campo_diferenca.appendChild(texto_diferenca);
    campo_porcentagem.appendChild(texto_porcentagem);

    //vincular os elementos ao documento
    corpo_tabela.appendChild(linha);
    corpo_tabela.appendChild(campo_data);
    corpo_tabela.appendChild(campo_preco);
    corpo_tabela.appendChild(campo_previsao);
    corpo_tabela.appendChild(campo_diferenca);
    corpo_tabela.appendChild(campo_porcentagem);

  }
}

function criarTabelaFuturo(data, futuro, range, seletor){
  var data = data;
  var futuro = futuro;
  var range = range;
  var seletor = seletor;

  var corpo_tabela = document.querySelector(seletor);
  for(var i=0; i<range; i++ ){
    //formatar a data
    var date = data[i];
    var dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    //Criar os elementos
    var linha = document.createElement("tr");
    var campo_data = document.createElement("td");
    var campo_futuro = document.createElement("td");
    //Criar estilo
    linha.className = "table";

    //Criar nós
    var texto_data = document.createTextNode(dataFormatada);
    var texto_futuro = document.createTextNode(parseFloat(futuro[i].toFixed(4)));

    //vincular os dados aos elementos
    campo_data.appendChild(texto_data);
    campo_futuro.appendChild(texto_futuro);

    //vincular os elementos ao documento
    corpo_tabela.appendChild(linha);
    corpo_tabela.appendChild(campo_data);
    corpo_tabela.appendChild(campo_futuro);

  }
}
/*
function tabela(){
  var xArray = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24', '2022-01-24'];
  var yArray = [100.470799,100.825146,101.050026,101.169745, 101.050026];

  var xArray2 = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24'];
  var yArray2 = [102.470799,101.825146,101.050026,104.169745, 104.169745];
  criarTabelaReal(xArray, yArray, yArray2);

  //criarTabelaFuturo(xArray, yArray, 30, '#futuro30');
  //criarTabelaFuturo(xArray, yArray, 60, '#futuro60');
}

tabela(); */
function keras(response){

  var lstmprevisao = response.lstm_json;
  var lstm_previsao = lstmprevisao.previsao;
  var lstm_preco = lstmprevisao.preco;
  var lstm_data = lstmprevisao.data;
  var lstm_futuro = lstmprevisao.futuro;
  var lstm_data_futuro = lstmprevisao.data_futuro;
  var acao = response.acao;

  document.getElementById("acao").textContent = "Previsão para o ativo - " + acao;


  var data_passada = [];
  for(var i = 0; i < lstm_data.length; i++ ){
    var date = new Date(lstm_data[i]);
    data_passada.push(date);
  };

  var data_futuro = [];
  for(var i = 0; i < lstm_data_futuro.length; i++ ){
    var date = new Date(lstm_data_futuro[i]);    
    data_futuro.push(date);
  };
  
  function validacao(){
    // Define Data
    /*var data = [
      {x: data_passada, y: lstm_previsao, mode:"lines", name:'previsão'},
      {x: data_passada, y: lstm_preco, mode:"lines", name:'preço'}
    ]; */
    var data = [
      {y: lstm_previsao, mode:"lines", name:'previsão'},
      {y: lstm_preco, mode:"lines", name:'preço'}
    ];
    // Define Layout
    var layout = {
      xaxis: {title: "Tempo (dias)"},//range: [40, 160], 
      yaxis: {title: "Preço (R$)"},  //range: [5, 16],
      title: "Preço real x previsto",
      width:1000
    };

    // Display using Plotly
    Plotly.newPlot("lstm_real", data, layout);

    criarTabelaReal(data_passada, lstm_preco, lstm_previsao);

  }

  function previsao30(){
    // Define Data
    var data = [
      {x: data_passada, y: lstm_preco, mode:"lines", name:'preço'},
      {x: data_futuro, y: lstm_futuro, mode:"lines", name:'futuro'}
    ];
    // Define Layout
    var layout = {
      xaxis: {title: "Período", range: [data_passada[0], data_futuro[29]]},//range: [40, 160], 
      yaxis: {title: "Preço (R$)"},  //range: [5, 16],
      title: "Previsão para 30 dias",
      width:1000
    };

    // Display using Plotly
    Plotly.newPlot("lstm_previsao_30", data, layout);

    criarTabelaFuturo(data_futuro, lstm_futuro, 30, '#futuro30');
  }

  function previsao60(){
    // Define Data
    var data = [
      {x: data_passada, y: lstm_preco, mode:"lines", name:'preço'},
      {x: data_futuro, y: lstm_futuro, mode:"lines", name:'futuro'}
    ];
    // Define Layout
    var layout = {
      xaxis: {title: "Período", range: [data_passada[0], data_futuro[59]]},//range: [40, 160], 
      yaxis: {title: "Preço (R$)"},  //range: [5, 16],
      title: "Previsão para 60 dias",
      width:1000
    };

    // Display using Plotly
    Plotly.newPlot("lstm_previsao_60", data, layout);

    criarTabelaFuturo(data_futuro, lstm_futuro, 60, '#futuro60');
  }

  function previsao90(){
    // Define Data
    var data = [
      {x: data_passada, y: lstm_preco, mode:"lines", name:'preço'},
      {x: data_futuro, y: lstm_futuro, mode:"lines", name:'futuro'}
    ];
    // Define Layout
    var layout = {
      xaxis: {title: "Período"},//range: [40, 160], 
      yaxis: {title: "Preço (R$)"},  //range: [5, 16],
      title: "Previsão para 90 dias",
      width:1000
    };

    // Display using Plotly
    Plotly.newPlot("lstm_previsao_90", data, layout);

    criarTabelaFuturo(data_futuro, lstm_futuro, 90, '#futuro90');
  }

  validacao();
  previsao30();
  previsao60();
  previsao90();

}
