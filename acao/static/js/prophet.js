
google.charts.load('current', {'packages':['corechart']});

function previsao_prophet(response){
    google.charts.load('current', {'packages':['corechart']});
    

    //const  prophetprevisao = JSON.parse({{ mc_json|safe }});
    //const prophetprev_teste = prophetprevisao.previsao_teste

    var prophetprevisao = response.mc_json;
    var prophetprev_teste = prophetprevisao.previsao_teste;
    var prophet_vreal = prophetprevisao.valor_real
    var prophet_prev_futura = prophetprevisao.previsao_futura
    //var error = (prophetprevisao.erro).toFixed(2)
    console.log(prophetprevisao)
    console.log(prophet_vreal)
    //google.charts.setOnLoadCallback(prophetReal());
    //google.charts.setOnLoadCallback(prophetPrev30);
    //google.charts.setOnLoadCallback(prophetPrev60);
    //google.charts.setOnLoadCallback(prophetPrev90);

    function prophetReal() {
        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'value');
        data.addColumn('number', 'Valor previsto');
        data.addColumn('number', 'Valor Real');
        for(var i = 0; i < prophetprev_teste.length; i++){
            data.addRows([  
    
            [prophet_vreal['ds'][i],  prophetprev_teste[i], prophet_vreal[i]]
            
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

    function prophetPrev30() {

        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'value');
        data.addColumn('number', 'Valor previsto');
      
        for(var i = 0; i < 30; i++){
                data.addRows([  
    
            [i+1,  prophet_prev_futura[i]]
            
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
    
    function prophetPrev60() {
    
        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'value');
        data.addColumn('number', 'Valor previsto');
      
        for(var i = 0; i < 60; i++){
                data.addRows([  
    
            [i+1,  prophet_prev_futura[i]]
            
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
    
    function prophetPrev90() {
    
        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'value');
        data.addColumn('number', 'Valor previsto');
      
        for(var i = 0; i < 90; i++){
                data.addRows([  
    
            [i+1,  prophet_prev_futura[i]]
            
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
function prophetPrev30() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 30; i++){
            data.addRows([  

        [i+1,  prophet_prev_futura[i]]
        
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

function prophetPrev60() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 60; i++){
            data.addRows([  

        [i+1,  prophet_prev_futura[i]]
        
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

function prophetPrev90() {

    //console.log(monte_carlo[0].length)
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'value');
    data.addColumn('number', 'Valor previsto');
  
    for(var i = 0; i < 90; i++){
            data.addRows([  

        [i+1,  prophet_prev_futura[i]]
        
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