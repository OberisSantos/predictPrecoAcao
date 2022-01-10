      
        
 /**
 google.charts.load('current', {'packages':['corechart']});
 google.charts.setOnLoadCallback(monteCarloReal);
 google.charts.setOnLoadCallback(monteCarloPrevisao30);
 google.charts.setOnLoadCallback(monteCarloPrevisao60);
 google.charts.setOnLoadCallback(monteCarloPrevisao90);
 **/
 

 //para keras lstm
 google.charts.setOnLoadCallback(lstmReal);
 //google.charts.setOnLoadCallback(lstmPrev30);
 //google.charts.setOnLoadCallback(lstmPrev60);
 //google.charts.setOnLoadCallback(lstmPrev90);

 const  lstmprevisao = JSON.parse({{ lstm_json|safe }});
 const lstm_valid_e_teste = lstmprevisao.validacao['Close']        
 const lstm_real = lstm_valid_e_teste[1]
 const lstm_valid = lstm_valid_e_teste[0]
 const lstm_erro = lstm_valid_e_teste[2]
 
 const lstm_prev_futura = lstmprevisao.previsao
 console.log(lstm_valid_e_teste)
 console.log(lstm_valid)
 //const error = (mcprevisao.erro).toFixed(2)
 

 

 function lstmReal() {

     //console.log(monte_carlo[0].length)
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'value');
     data.addColumn('number', 'Valor previsto');
     data.addColumn('number', 'Valor Real');
     
     for(var i = 0; i < lstm_valid.length; i++){
         data.addRows([  

         [i+1,  lstm_valid[i], lstm_real[i]]
         
         ]);
         
     }
 
     var options = {
     title: 'Valor Real | Previsão - Erro médio considerado para o modelo: '+ lstm_erro,
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

     var chart = new google.visualization.LineChart(document.getElementById('lstm_real'));

     chart.draw(data, options);
 }
 /*
 function lstmPrev30() {

     //console.log(monte_carlo[0].length)
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'value');
     data.addColumn('number', 'Valor previsto');
   
     for(var i = 0; i < 30; i++){
             data.addRows([  

         [i+1,  lstm_prev_futura[i]]
         
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

     var chart30 = new google.visualization.LineChart(document.getElementById('lstm_previsao_30'));

     chart30.draw(data, options);
 }

 function lstmPrev60() {

     //console.log(monte_carlo[0].length)
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'value');
     data.addColumn('number', 'Valor previsto');
   
     for(var i = 0; i < 60; i++){
             data.addRows([  

         [i+1,  lstm_prev_futura[i]]
         
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

     var chart60 = new google.visualization.LineChart(document.getElementById('lstm_previsao_60'));

     chart60.draw(data, options);
 }

 function lstmPrev90() {

     //console.log(monte_carlo[0].length)
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'value');
     data.addColumn('number', 'Valor previsto');
   
     for(var i = 0; i < 90; i++){
             data.addRows([  

         [i+1,  lstm_prev_futura[i]]
         
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

     var chart90 = new google.visualization.LineChart(document.getElementById('lstm_previsao_90'));

     chart90.draw(data, options);
 }
 */
 