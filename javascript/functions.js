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

function userInputIsEmpty(str, element){
    if(str.length == 0){
        animateAlert(element,"pop");
        return true;
    }
    animateAlert(element,"hide");
    return false;
}

// -----------------------------------------------------------------
// tratamento de inputs do formulário de inscrição
// -----------------------------------------------------------------

function nameInputTr(){
    let name = $("#inputSignName").val();
    let alert = $("#nameAlert0");
    userInputIsEmpty(name, alert);
}

function surInputTr(){
    let sur = $("#inputSignSur").val();
    let alert = $("#surAlert0");
    userInputIsEmpty(sur, alert);
}

function streetInputTr(){
    let street = $("#inputStreet").val();
    let alert = $("#streetAlert0");
    userInputIsEmpty(street, alert);
}

function sectorInputTr(){
    let sector = $("#inputSector").val();
    let alert = $("#sectorAlert0");
    userInputIsEmpty(sector, alert);
}

function numInputTr(){
    let num = $("#inputNumber").val();
    let alert = $("#nbrAlert0");
    userInputIsEmpty(num, alert);
}

function cepInputTr(){
    let cep = $("#InputCEP").val();
    let alert = $("#cepAlert0");
    userInputIsEmpty(cep, alert);
}

const inputElement = document.querySelectorAll(".form-control");
console.log(inputElement);

// tratamento de input do nome
inputElement[2].addEventListener("blur", nameInputTr);
inputElement[2].addEventListener("input", nameInputTr);

// tratamento de input do sobrenome
inputElement[3].addEventListener("blur", surInputTr);
inputElement[3].addEventListener("input", surInputTr);

// tratamento de input do email
inputElement[4].addEventListener("input", ()=>{
    let email = $("#inputEmailSign").val();
    let alert0 = $("#emailAlert0");
    let alert1 = $("#emailAlert1");
    userInputIsEmpty(email, alert0);
    if(email.indexOf('@') > 0 && email.indexOf('.com') > 0 && (email.indexOf('.com') - email.indexOf('@')) > 1  ){
        animateAlert(alert1, "hide");
    }
});
inputElement[4].addEventListener("blur", ()=>{
    let email = $("#inputEmailSign").val();
    let alert0 = $("#emailAlert0");
    let alert1 = $("#emailAlert1");
    userInputIsEmpty(email, alert0);
    if(email.length > 0){
        if(email.indexOf('@') <= 0 || email.indexOf('.com')<=0 || (email.indexOf('.com') - email.indexOf('@')) <= 1){
            animateAlert(alert1, "pop");
        }
    }
});

// tratamento de input da senha
inputElement[5].addEventListener("input", ()=>{
    let pass = $("#inputPasswordSign").val();
    let alert0 = $("#passAlert0");
    let alert1 = $("#passAlert1");
    userInputIsEmpty(pass, alert0);
    if(pass.length >= 6 || pass.length == 0){
        animateAlert(alert1, "hide");
    }
});
inputElement[5].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let alert0 = $("#passAlert0");
    let alert1 = $("#passAlert1");
    userInputIsEmpty(pass, alert0);
    if(pass.length < 6 && pass.length > 0){
        animateAlert(alert1, "pop");
    }
});

// tratamento de input do telefone
function areThereLetters(str){
    let check = false;
    for (let i = 0; i < str.length; i++) {
        if(str[i] < 48 || str[i] > 57){
        }else{
            check = true;
        }
    }
    return check;
}
inputElement[6].addEventListener("input", ()=>{
    let phone = $("#inputPhone").val();
    let iphone = $("#inputPhone");
    let alert0 = $("#phoneAlert0");
    let alert1 = $("#phoneAlert1");
    userInputIsEmpty(phone, alert0);
    if(areThereLetters(phone)){
        animateAlert(alert1, "pop");
    }else{
        animateAlert(alert1, "hide");
    }
});
inputElement[6].addEventListener("blur", ()=>{
    let phone = $("#inputPhone").val();
    let alert0 = $("#phoneAlert0");
    let alert1 = $("#phoneAlert1");
    userInputIsEmpty(phone, alert0);
    if(phone.length < 10){
        animateAlert(alert1, "pop");
    }

});

// tratamento da confirmação de senha
inputElement[7].addEventListener("input", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert0 = $("#passConfirmAlert0");
    let alert1 = $("#passConfirmAlert1");
    userInputIsEmpty(conPass, alert0);
    if(conPass.length >= pass.length){
        if(conPass === pass){
            animateAlert(alert1, "hide");
        }else{
            animateAlert(alert1, "pop");
        }
    }
});
inputElement[7].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert0 = $("#passConfirmAlert0");
    let alert1 = $("#passConfirmAlert1");
    userInputIsEmpty(conPass, alert0);
    if(conPass === pass){
        animateAlert(alert1, "hide");
    }else{
        animateAlert(alert1, "pop");
    }

});

// tratamento da rua
inputElement[8].addEventListener("blur", streetInputTr);
inputElement[8].addEventListener("input", streetInputTr);

// tratamento do setor
inputElement[9].addEventListener("blur", sectorInputTr);
inputElement[9].addEventListener("input", sectorInputTr);

// tratamento do numero ***
inputElement[10].addEventListener("blur", numInputTr);
inputElement[10].addEventListener("input", numInputTr);

// tratamento do estado
inputElement[14].addEventListener("change", ()=>{
    setCitiesSelect();
    if($("#inputState").val() != "null"){
        animateAlert($("#stateAlert0"),"hide");
    }else{
        animateAlert($("#stateAlert0"),"pop");
    }
});
inputElement[14].addEventListener("blur", ()=>{
    console.log($("#inputState").val());
    if($("#inputState").val() != "null"){
        animateAlert($("#stateAlert0"),"hide");
    }else{
        animateAlert($("#stateAlert0"),"pop");
    }
});

// tratamento da cidade
function cityTr(){
    if($("#inputCity").val() != "null"){
        console.log("hide");
        animateAlert($("#cityAlert0"),"hide");
    }else{
        console.log("pop");
        animateAlert($("#cityAlert0"),"pop");
    }
}
inputElement[15].addEventListener("change", cityTr);
inputElement[15].addEventListener("blur", cityTr);


//tratamento do cep ***
inputElement[16].addEventListener("blur", cepInputTr);
inputElement[16].addEventListener("input", cepInputTr);
