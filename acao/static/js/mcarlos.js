
google.charts.load('current', {'packages':['corechart']});

function previsao_mc(response){
    google.charts.load('current', {'packages':['corechart']});
    

    //const  mcprevisao = JSON.parse({{ mc_json|safe }});
    //const mcprev_teste = mcprevisao.previsao_teste

    var mcprevisao = response.mc_json;
    var mcprev_teste = mcprevisao.previsao_teste;
    var mc_vreal = mcprevisao.valor_real
    var mc_prev_futura = mcprevisao.previsao_futura
    var error = (mcprevisao.erro).toFixed(2)

    google.charts.setOnLoadCallback(mcReal());
    google.charts.setOnLoadCallback(mcPrev30);
    google.charts.setOnLoadCallback(mcPrev60);
    google.charts.setOnLoadCallback(mcPrev90);

    function mcReal() {
        //console.log(monte_carlo[0].length)
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'value');
        data.addColumn('number', 'Valor previsto');
        data.addColumn('number', 'Valor Real');
        for(var i = 0; i < mcprev_teste.length; i++){
            data.addRows([  
    
            [i+1,  mcprev_teste[i], mc_vreal[i]]
            
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

    function mcPrev30() {

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
    
    function mcPrev60() {
    
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
    
    function mcPrev90() {
    
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
function mcPrev30() {

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

function mcPrev60() {

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

function mcPrev90() {

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