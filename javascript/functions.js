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
        updateBtnKey(10,false);
        input.attr("disabled", "true");
    }
}

// -----------------------------------------------------------------
// tratamento de inputs do formulário de inscrição
// -----------------------------------------------------------------
const inputElement = document.querySelectorAll(".form-sign-required");
var alertElement0 = document.querySelectorAll(".alertMsgContainer-0");
var btnKey = new Array(12);
var btnKey1 = new Array(5);

console.log(inputElement);
console.log(alertElement0);

function userInput(inputElement, alertElement, i){
    if(inputElement[i].value.length <= 0 || inputElement[i].value === "null"){
        if(btnKey[i] != false){
            animateAlert(alertElement[i],"pop");
            updateBtnKey(i,false);
            updateBtn();
        }
        return;
    }
    if(btnKey[i] != true){
        animateAlert(alertElement[i],"hide");
        updateBtnKey(i,true);
        updateBtn();
    }
    return;
}

function updateBtnKey(key, bool){
    if(key >= 0 && key < 12){
        btnKey[key] = bool;
    }
    console.log(btnKey);
}
function updateBtnKey1(key, bool){
    if(key >= 0 && key < 6){
        btnKey1[key] = bool;
    }
    console.log(btnKey1);
}
function updateBtn(){
    // console.log(btnKey);
    for (let i = btnKey.length - 1; i >= 0; i--) {
        if(btnKey[i] != true){
            $("#signUpSubmit").attr("disabled", "true");
            return;
        }
    }
    for (let i = btnKey1.length - 1; i >= 0; i--) {
        if(btnKey1[i] != true){
            $("#signUpSubmit").attr("disabled", "true");
            return;
        }
    }
    $("#signUpSubmit").removeAttr("disabled");
}

for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].addEventListener("input", ()=>{
        userInput(inputElement, alertElement0,i);
    });
    inputElement[i].addEventListener("blur", ()=>{
        userInput(inputElement, alertElement0,i);
    });
}


// tratamento de input do email
inputElement[2].addEventListener("input", ()=>{

    let email = $("#inputEmailSign").val();
    let alert1 = $("#emailAlert1");


    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(reg.test(email)){
        animateAlert(alert1, "hide");
        updateBtnKey1(0,true);
        updateBtn();
    }
});
inputElement[2].addEventListener("blur", ()=>{
    let email = $("#inputEmailSign").val();
    let alert1 = $("#emailAlert1");
    if(email.length > 0){
        let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if(!reg.test(email)){
            animateAlert(alert1, "pop");
            updateBtnKey1(0,false);
            updateBtn();
        }
    }  

});

// tratamento de input do telefone
inputElement[4].addEventListener("input", ()=>{ 
    let phone = document.querySelector("#inputPhone").value.replace(/[/ ()]/g,'');
    let iphone = $("#inputPhone");
    let alert1 = $("#phoneAlert1");
    if(/^(\d{2,2})(\d{4,5})(\d{4,4})$/.test(phone)){
        animateAlert(alert1, "hide");
        updateBtnKey1(2,true);
        updateBtn();
    }
    iphone.val(phone.replace(/^(\d{2,2})(\d{4,5})(\d{4,4})$/,'($1) $2 $3'));
});
inputElement[4].addEventListener("blur", ()=>{
    let phone = document.querySelector("#inputPhone").value.replace(/[/ ()]/g,'');
    let alert1 = $("#phoneAlert1");
    if(/^(\d{2,2})(\d{4,5})(\d{4,4})$/.test(phone)){
        animateAlert(alert1, "hide");
        updateBtnKey1(2,true);
        updateBtn();
    }else{
        animateAlert(alert1, "pop");
        updateBtnKey1(2,false);
        updateBtn();
    }
});

// tratamento de input da senha
inputElement[3].addEventListener("input", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert1 = $("#passAlert1");
    let conAlert1 = $("#passConfirmAlert1");
    if(pass.length >= 6 || pass.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(1,true);
        updateBtn();
    }
    if(conPass.length >= pass.length){
        if(conPass === pass){
            animateAlert(conAlert1, "hide");
            updateBtnKey1(3,true);
            updateBtn();
        }else{
            animateAlert(conAlert1, "pop");
            updateBtnKey1(3,false);
            updateBtn();
        }
    }
});
inputElement[3].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let alert1 = $("#passAlert1");
    if(pass.length < 6 && pass.length > 0){
        animateAlert(alert1, "pop");
        updateBtnKey1(1,false);
        updateBtn();
    }
});


// tratamento da confirmação de senha
inputElement[5].addEventListener("input", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert1 = $("#passConfirmAlert1");
    if(conPass.length >= pass.length){
        if(conPass === pass){
            animateAlert(alert1, "hide");
            updateBtnKey1(3,true);
            updateBtn();
        }else{
            animateAlert(alert1, "pop");
            updateBtnKey1(3,false);
            updateBtn();
        }
    }
});
inputElement[5].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert1 = $("#passConfirmAlert1");
    if(conPass === pass){
        animateAlert(alert1, "hide");
        updateBtnKey1(3,true);
        updateBtn();
    }else{
        animateAlert(alert1, "pop");
        updateBtnKey1(3,false);
        updateBtn();
    }

});

// Carregando as cidades de acordo com o estado
inputElement[9].addEventListener("change", ()=>{
    setCitiesSelect();
});

//tratamento do CEP
inputElement[11].addEventListener("input", ()=>{ 
    let cep = document.querySelector("#InputCEP").value.replace(/[/ /-]/g,'');
    let icep = $("#InputCEP");
    let alert1 = $("#cepAlert1");
    if(/^(\d{5,5})(\d{3,3})$/.test(cep)){
        animateAlert(alert1, "hide");
        updateBtnKey1(4,true);
        updateBtn();
    }
    icep.val(cep.replace(/^(\d{1,5})(\d{3,3})$/,'$1-$2'));
});
inputElement[11].addEventListener("blur", ()=>{
    let cep = document.querySelector("#InputCEP").value.replace(/[/ /-]/g,'');
    let alert1 = $("#cepAlert1");
    if(/^(\d{5,5})(\d{3,3})$/.test(cep)){
        animateAlert(alert1, "hide");
        updateBtnKey1(4,true);
        updateBtn();
    }else{
        animateAlert(alert1, "pop");
        updateBtnKey1(4,false);
        updateBtn();
    }
});