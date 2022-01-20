/**
var xArray = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24', '2022-01-24'];
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
Plotly.newPlot("real", data, layout);*/

function criarTabelaReal(data, preco, previsao){
  this.data = data;
  this.preco = preco;
  this.previsao = previsao;

  var corpo_tabela = document.querySelector("#tablereal");
  var fim = data.length - 1;
  for(var i=fim; i >fim - 30; i-- ){
    //formatar a data
    var date = data[i];
    var dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    //Criar os elementos
    var linha = document.createElement("tr");
    var campo_data = document.createElement("td");
    var campo_preco = document.createElement("td");
    var campo_previsao = document.createElement("td");
    //Criar estilo
    //linha.className = "nomeclasse";


    //Criar nós
    var texto_data = document.createTextNode(dataFormatada);
    var texto_preco = document.createTextNode(parseFloat(preco[i]).toFixed(4));
    var texto_previsao = document.createTextNode(parseFloat(previsao[i]).toFixed(4));

    //vincular os dados aos elementos
    campo_data.appendChild(texto_data);
    campo_preco.appendChild(texto_preco);
    campo_previsao.appendChild(texto_previsao);

    //vincular os elementos ao documento
    corpo_tabela.appendChild(linha);
    corpo_tabela.appendChild(campo_data);
    corpo_tabela.appendChild(campo_preco);
    corpo_tabela.appendChild(campo_previsao);

  }
}

function criarTabelaFuturo(data, futuro, range, seletor){
  this.data = data;
  this.futuro = futuro;
  this.range = range;
  this.seletor = seletor;

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
    //linha.className = "nomeclasse";

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
/**
function tabela(){
  var xArray = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24', '2022-01-24'];
  var yArray = [100.470799,100.825146,101.050026,101.169745, 101.050026];

  var xArray2 = ['2022-01-19','2022-01-20','2022-01-21','2022-01-24'];
  var yArray2 = [102.470799,101.825146,101.050026,104.169745, 104.169745];
  criarTabelaReal(xArray, yArray, yArray2);

  criarTabelaFuturo(xArray, yArray, 30, '#futuro30');
  criarTabelaFuturo(xArray, yArray, 60, '#futuro60');
}

tabela(); */
 
function keras(response){

  var lstmprevisao = response.lstm_json;
  var lstm_previsao = lstmprevisao.previsao;
  var lstm_preco = lstmprevisao.preco;
  var lstm_data = lstmprevisao.data;
  var lstm_futuro = lstmprevisao.futuro;
  var lstm_data_futuro = lstmprevisao.data_futuro;

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
    var data = [
      {x: data_passada, y: lstm_previsao, mode:"lines", name:'previsão'},
      {x: data_passada, y: lstm_preco, mode:"lines", name:'preço'}
    ];
    // Define Layout
    var layout = {
      xaxis: {title: "Datas"},//range: [40, 160], 
      yaxis: {title: "Valor (R$)"},  //range: [5, 16],
      title: "Preço de previsão e preço de fechamento"
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
      xaxis: {title: "Datas", range: [data_passada[0], data_futuro[29]]},//range: [40, 160], 
      yaxis: {title: "Valor (R$)"},  //range: [5, 16],
      title: "Previsão para 30 dias"
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
      xaxis: {title: "Datas", range: [data_passada[0], data_futuro[59]]},//range: [40, 160], 
      yaxis: {title: "Valor (R$)"},  //range: [5, 16],
      title: "Previsão para 60 dias"
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
      xaxis: {title: "Datas"},//range: [40, 160], 
      yaxis: {title: "Valor (R$)"},  //range: [5, 16],
      title: "Previsão para 30 dias"
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
/**
google.charts.load('current', {'packages':['line']});
function previsao_lstmss(response){
  var lstmprevisao = response.lstm_json;
  var lstm_previsao = lstmprevisao.previsao;
  var lstm_data = lstmprevisao.data;
  console.log(lstmprevisao)
  console.log('quebra')
  console.log(lstm_data)

  console.log(typeof(lstm_data))
}

function previsao_lstm(response){
    google.charts.load('current', {'packages':['line']});
    
    var lstmprevisao = response.lstm_json;
    var lstm_previsao = lstmprevisao.previsao;
    var lstm_preco = lstmprevisao.preco;
    var lstm_data = lstmprevisao.data;
    var lstm_futuro = lstmprevisao.futuro;
    var lstm_data_futuro = lstmprevisao.data_futuro;

    google.charts.setOnLoadCallback(lstmReal());
    google.charts.setOnLoadCallback(lstmPrev30);
    google.charts.setOnLoadCallback(lstmPrev60);
    google.charts.setOnLoadCallback(lstmPrev90);



    function lstmReal() {
        var data = new google.visualization.DataTable();
        
        data.addColumn('date', 'value');
        data.addColumn('number', 'previsão');
        data.addColumn('number', 'preço');
        for(var i = 0; i < lstm_previsao.length; i++){
          var date = new Date(lstm_data[i])
          
          data.addRows([  
  
          [date,  lstm_previsao[i], lstm_preco[i]]
          
          ]);
            
        }
            
        var options = {
          title: 'Preço de previsão e preço de fechamento',
          curveType: 'function',
          width: 400,
          height: 300,

          //legend: { position: 'bottom' },
          //explorer: { maxZoomOut: 6 },
          hAxis: {
              title: 'Data'
            },
          vAxis: {
              title: 'Preço (R$)'
          },
           
          hAxis: {
            format: 'd/M/yy',
            gridlines: {count: 15}
          },
          vAxis: {
            gridlines: {color: 'none'},
            minValue: 0
          }
        };
    
        var chart = new google.visualization.LineChart(document.getElementById('lstm_real'));
    
        chart.draw(data, options);
    }
  

    function lstmPrev30() {

        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'value');
        data.addColumn('number', 'preço');    
              
        for(var i = 0; i < lstm_preco.length; i++){
          var date = new Date(lstm_data[i])
          data.addRows([      
            [date,  lstm_preco[i]]            
          ]);
            
        }
        data.addColumn('number', 'futuro');
        for(var i = 0; i < 30; i++){
          var date = new Date(lstm_data_futuro[i])
          data.addRows([  
            [date, null, lstm_futuro[i]]      
          ]);      
        }
        
        var options = {
          title: 'Previsão do preço futuro',
          curveType: 'function',
          legend: { position: 'center' },
          explorer: { maxZoomOut: 6 },
          width: 900,
          height: 500,
          hAxis: {
            title: 'Dias'
          },
          vAxis: {
            title: 'Valor (R$)'
          },
          hAxis: {
            format: 'd/M/yy',
            gridlines: {count: 15}
          },
          vAxis: {
            gridlines: {color: 'none'},
            minValue: 0
          }
        };
    
        var chart30 = new google.visualization.LineChart(document.getElementById('lstm_previsao_30'));
    
        chart30.draw(data, options);
    }
    
    
    
    function lstmPrev60() {

      //console.log(monte_carlo[0].length)
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'value');
      data.addColumn('number', 'preço');    
            
      for(var i = 0; i < lstm_preco.length; i++){
        var date = new Date(lstm_data[i])
        data.addRows([      
          [date,  lstm_preco[i]]            
        ]);
          
      }
      data.addColumn('number', 'futuro');
      for(var i = 0; i < 60; i++){
        var date = new Date(lstm_data_futuro[i])
        data.addRows([  
          [date, null, lstm_futuro[i]]      
        ]);      
      }
      
      var options = {
        title: 'Previsão do preço futuro',
        curveType: 'function',
        legend: { position: 'center' },
        //explorer: { maxZoomOut: 6 },
        width: 900,
        height: 500,
        hAxis: {
          title: 'Dias'
        },
        vAxis: {
          title: 'Valor (R$)'
        },
        hAxis: {
          format: 'd/M/yy',
          gridlines: {count: 15}
        },
        vAxis: {
          gridlines: {color: 'none'},
          minValue: 0
        }
      };
  
      var chart60 = new google.visualization.LineChart(document.getElementById('lstm_previsao_60'));
  
      chart60.draw(data, options);
    }
    
   
    

    function lstmPrev90() {

      //console.log(monte_carlo[0].length)
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'value');
      data.addColumn('number', 'preço');    
            
      for(var i = 0; i < lstm_preco.length; i++){
        var date = new Date(lstm_data[i])
        data.addRows([      
          [date,  lstm_preco[i]]            
        ]);
          
      }
      data.addColumn('number', 'futuro');
      for(var i = 0; i < 90; i++){
        var date = new Date(lstm_data_futuro[i])
        data.addRows([  
          [date, null, lstm_futuro[i]]      
        ]);      
      }
      
      var options = {
        title: 'Previsão do preço futuro',
        curveType: 'function',
        legend: { position: 'center' },
        //explorer: { maxZoomOut: 6 },
        width: 900,
        height: 400,
        hAxis: {
          title: 'Dias'
        },
      vAxis: {
          title: 'Valor (R$)'
        },
        hAxis: {
          format: 'd/M/yy',
          gridlines: {count: 15}
        },
        vAxis: {
          gridlines: {color: 'none'},
          minValue: 0
        }
      };
  
      var chart90 = new google.visualization.LineChart(document.getElementById('lstm_previsao_90'));
  
      chart90.draw(data, options);
    }
}
*/

/**
var previsao_teste = ["{{ monte_carlo.previsao_teste|safe }}".replace('[', '' ).replace(']', '', ).split(',').map(Number)];
var valor_real = ["{{ monte_carlo.valor_real|safe }}".replace('[', '' ).replace(']', '', ).split(',').map(Number)];
var previsao_futura = ["{{ monte_carlo.previsao_futura|safe }}".replace('[', '' ).replace(']', '', ).split(',').map(Number)]
let pr = JSON.parse("{{ monte_carlo.previsao_futura|safe }}")
console.log(typeof(pr))
var error = "{{  monte_carlo.erro|safe }}"

error = parseFloat(error).toFixed(2)**/


/**
function monteCarloReal() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
    data.addColumn('number', 'Valor Real');
    
    for(var i = 0; i < previsao_teste[0].length; i++){
            data.addRows([  

        [i+1,  previsao_teste[0][i], valor_real[0][i]]
        
        ]);
        
    }

    var options = {
    title: 'Valor Real | Previsão - Erro médio da previsão: '+ error,
    curveType: 'function',
    legend: { position: 'bottom' },
    explorer: { maxZoomOut: 6 },
    hAxis: {
        title: 'Dias'
      },
    vAxis: {
        title: 'Valor (R$)'
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('monte_carlo_real'));

    chart.draw(data, options);
}
**/
/**
function lstmPrev30() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 30; i++){
            data.addRows([  

        [i+1,  mc_prev_futura[i]]
        
        ]);
        
    }

    var options = {
    title: 'Previsão',
    curveType: 'function',
    legend: { position: 'center' },
    explorer: { maxZoomOut: 6 },
    width: 1000,
    height: 400,
    hAxis: {
        title: 'Dias'
      },
    vAxis: {
        title: 'Valor (R$)'
      }
    };

    var chart30 = new google.visualization.LineChart(document.getElementById('monte_carlo_previsao_30'));

    chart30.draw(data, options);
}

function lstmPrev60() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 60; i++){
            data.addRows([  

        [i+1,  mc_prev_futura[i]]
        
        ]);
        
    }

    var options = {
    title: 'Previsão',
    curveType: 'function',
    legend: { position: 'center' },
    explorer: { maxZoomOut: 6 },
    width: 1000,
    height: 400,
    hAxis: {
        title: 'Dias'
      },
    vAxis: {
        title: 'Valor (R$)'
      }
    };

    var chart60 = new google.visualization.LineChart(document.getElementById('monte_carlo_previsao_60'));

    chart60.draw(data, options);
}

function lstmPrev90() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 90; i++){
            data.addRows([  

        [i+1,  mc_prev_futura[i]]
        
        ]);
        
    }

    var options = {
    title: 'Previsão',
    curveType: 'function',
    legend: { position: 'center' },
    explorer: { maxZoomOut: 6 },
    width: 1000,
    height: 400,
    hAxis: {
        title: 'Dias'
      },
    vAxis: {
        title: 'Valor (R$)'
      }
    };

    var chart90 = new google.visualization.LineChart(document.getElementById('monte_carlo_previsao_90'));

    chart90.draw(data, options);
}*/