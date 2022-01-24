
$("#buscaForm").submit(function(e){
    e.preventDefault(); //não carregar a pagina

    let serializeData = $(this).serialize();
    let url = "predict/acao";
    
    
    $.ajax({
        type: 'POST',
        url: url,
        data: serializeData,
        beforeSend: function () {
            //Aqui adicionas o loader           
            $('#load').show();
            
            //$("#load").text('Realizando a previsao');

        }, 
        success: function(response){
            $("#load").hide();
            $("#prevTab").show();
            //previsao_mc(response);
            //previsao_lstm(response);
            keras(response);
        },
        error: function(response){
            $("#load").hide();
            
        },
        


    }) 

});

