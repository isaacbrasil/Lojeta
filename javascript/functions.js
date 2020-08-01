function setCitiesSelect() {
    let input = $("#inputCity");
    if ($("#inputState").val() != "null") {
        //const axios = require('axios');
        // Make a request for a user with a given ID
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + $("#inputState").val() + '/municipios')
            .then(function (response) {
                // handle success
                console.log(response);

                input.empty();
                input.append("<option value='null' selected>Selecione a Cidade</option>");
                for (let i = 0; i < response.data.length; i++) {
                    input.append("<option>" + response.data[i].nome + "</option>");
                }
            })
            .catch(function (error) {
                alert("Algo deu errado no IBGE! Chamem os bombeiros!!")
                console.log(error);
            })
            .then(function () {
                input.removeAttr("disabled");
            });
    } else {
        input.empty();
        input.append("<option value='null' selected>Selecione um Estado</option>");
        input.attr("disabled", "true");
    }
}

function userInputIsEmpty(str){
    if(str.length == 0){
        return true;
    }
    return false;
}

function userInputTreatment(type){
    // tratar o nome
    if(type == 0){
        name = $("#inputSignName").val();
        console.log(name.length);
        if(userInputIsEmpty(name)){
            $("#nameAlert0").animate({
                height: '20px'
            })
        }else{
            $("#nameAlert0").animate({
                height: '0px'
            })
        }
    }else if(type == 1){
        sur = $("#inputSignSur").val();
        console.log(sur.length);
        if(userInputIsEmpty(sur)){
            $("#surAlert0").animate({
                height: '20px'
            })
        }else{
            $("#surAlert0").animate({
                height: '0px'
            })
        }
    }else if(type == 2){
        email = $("#inputSignSur").val();
        console.log(email.length);
        if(userInputIsEmpty(email)){
            $("#emailAlert0").animate({
                height: '20px'
            })
        }else{
            $("#emailAlert0").animate({
                height: '0px'
            })
        }
    }
}