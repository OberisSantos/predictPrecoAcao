      

google.charts.load('current', {'packages':['corechart']});
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
    google.charts.load('current', {'packages':['corechart']});
    
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
          width: 900,
          height: 500,

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
  
      var chart90 = new google.visualization.LineChart(document.getElementById('lstm_previsao_90'));
  
      chart90.draw(data, options);
    }
}


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
}