//Toggling entre a tela de login e cadastro
document.querySelector("#signUpFor").addEventListener("click", animateSignUp);
document.querySelector("#signUpBack").addEventListener("click", animateLogin);

// tratamento de inputs do formulário de inscrição
// -----------------------------------------------
const inputElement = document.querySelectorAll(".form-sign-required");
var alertElement0 = document.querySelectorAll(".alertMsgContainer-0");
var alertElement1 = document.querySelectorAll(".alertMsgContainer-1");
var btnKey = new Array(12);
var btnKey1 = new Array(5);

//Funcões utilitárias
//-------------------

//limpa todas as Mensagens
function clearMsgs() {
    for (let i = 0; i < alertElement0.length; i++) {
        animateAlert(alertElement0[i], "hide");
    }
    for (let i = 0; i < alertElement1.length; i++) {
        animateAlert(alertElement1[i], "hide");
    }
}
//atualiza a chave0 com algum parametro
function updateBtnKey(key, bool) {
    if(key >= 0 && key < 12){
        btnKey[key] = bool;
    }
    console.log(btnKey);
}
//atualiza a chave1 com algum parametro
function updateBtnKey1(key, bool) {
    if(key >= 0 && key < 6){
        btnKey1[key] = bool;
    }
    console.log(btnKey1);
}
//atualiza o estado do botão de cadastro
function updateBtn(){
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
//Carrega as cidades de acordo com o estado 
function setCitiesSelect() {
    let input = $("#inputCity");
    if ($("#inputState").val() != "null") {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + $("#inputState").val() + '/municipios')
            .then(function (response) {
                // handle success
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
        updateBtnKey(10, false);
        input.attr("disabled", "true");
    }
}

//Controlando todas as mensagens de input obrigatório
//---------------------------------------------------

//Checa se determinado input esta vazio, e dps, anima a mensagem de alerta
function userInput(inputElement, alertElement, i) {
    if (inputElement[i].value.length <= 0 || inputElement[i].value === "null") {
        if (btnKey[i] != false) {
            animateAlert(alertElement[i], "pop");
            updateBtnKey(i, false);
            updateBtn();
        }
        return;
    }
    if (btnKey[i] != true) {
        animateAlert(alertElement[i], "hide");
        updateBtnKey(i, true);
        updateBtn();
    }
    return;
}
//aciona todos os eventListeners de alerta0
for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].addEventListener("input", ()=>{
        userInput(inputElement, alertElement0,i);
    });
    inputElement[i].addEventListener("blur", ()=>{
        userInput(inputElement, alertElement0,i);
    });
}

//Controlando as Mensagens de erro diversas
//-----------------------------------------

//tratamento de input do email
inputElement[2].addEventListener("input", ()=>{
    let email = $("#inputEmailSign").val();
    let alert1 = $("#emailAlert1");


    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (reg.test(email) || email.length == 0){
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
    if (/^(\d{2,2})(\d{4,5})(\d{4,4})$/.test(phone) || phone.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(2,true);
        updateBtn();
    }
    iphone.val(phone.replace(/^(\d{2,2})(\d{1,5})(\d{4,4})$/,'($1) $2 $3'));
});
inputElement[4].addEventListener("blur", ()=>{
    let phone = document.querySelector("#inputPhone").value.replace(/[/ ()]/g,'');
    let alert1 = $("#phoneAlert1");
    if (/^(\d{2,2})(\d{4,5})(\d{4,4})$/.test(phone) || phone.length == 0) {
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
    if (/^(\d{5,5})(\d{3,3})$/.test(cep) || cep.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(4,true);
        updateBtn();
    }
    icep.val(cep.replace(/^(\d{1,5})(\d{3,3})$/,'$1-$2'));
});
inputElement[11].addEventListener("blur", ()=>{
    let cep = document.querySelector("#InputCEP").value.replace(/[/ /-]/g,'');
    let alert1 = $("#cepAlert1");
    if (/^(\d{5,5})(\d{3,3})$/.test(cep) || cep.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(4,true);
        updateBtn();
    }else{
        animateAlert(alert1, "pop");
        updateBtnKey1(4,false);
        updateBtn();
    }
});


//Controlando os dados recebidos pelo usuário
//-------------------------------------------
document.querySelector("#signUpSubmit").addEventListener("click", () => {
    Ad = new Adress(inputElement[6].value,
        inputElement[7].value,
        inputElement[8].value,
        document.querySelector("#inputQd").value,
        document.querySelector("#inputLt").value,
        document.querySelector("#inputComplement").value,
        inputElement[9].value,
        inputElement[10].value,
        inputElement[11].value,
    );
    User = new User(inputElement[0].value,
        inputElement[1].value,
        inputElement[2].value,
        Ad
    );
    console.log(User);
});