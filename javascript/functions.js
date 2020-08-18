//Toggling entre a tela de login e cadastro
document.querySelector("#signUpFor").addEventListener("click", animateSignUp);
document.querySelector("#signUpBack").addEventListener("click", animateLogin);

// tratamento de inputs do formulário de inscrição
// -----------------------------------------------
const inputElement = document.querySelectorAll(".form-sign-required");
var alertElement0 = document.querySelectorAll(".alertMsgContainer-0");
var alertElement1 = document.querySelectorAll(".alertMsgContainer-1");
var btnKey = new Array(4);
var btnKey1 = new Array(3);

console.log(inputElement);
console.log(alertElement0);
console.log(alertElement1);


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
    if(key >= 0 && key < 4){
        btnKey[key] = bool;
    }
    console.log(btnKey);
}
//atualiza a chave1 com algum parametro
function updateBtnKey1(key, bool) {
    if(key >= 0 && key < 3){
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
inputElement[1].addEventListener("input", ()=>{
    let email = $("#inputEmailSign").val();
    let alert1 = $("#emailAlert1");


    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (reg.test(email) || email.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(0,true);
        updateBtn();
    }
});
inputElement[1].addEventListener("blur", ()=>{
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

// tratamento de input da senha
inputElement[2].addEventListener("input", ()=>{
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
            updateBtnKey1(2,true);
            updateBtn();
        }else{
            animateAlert(conAlert1, "pop");
            updateBtnKey1(2,false);
            updateBtn();
        }
    }
});
inputElement[2].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let alert1 = $("#passAlert1");
    if(pass.length < 6 && pass.length > 0){
        animateAlert(alert1, "pop");
        updateBtnKey1(1,false);
        updateBtn();
    }
});
// tratamento da confirmação de senha
inputElement[3].addEventListener("input", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert1 = $("#passConfirmAlert1");
    if(conPass.length >= pass.length){
        if(conPass === pass || conPass.length == 0){
            animateAlert(alert1, "hide");
            updateBtnKey1(2,true);
            updateBtn();
        }else{
            animateAlert(alert1, "pop");
            updateBtnKey1(2,false);
            updateBtn();
        }
    }
});
inputElement[3].addEventListener("blur", ()=>{
    let pass = $("#inputPasswordSign").val();
    let conPass = $("#inputPasswordConfirm").val();
    let alert1 = $("#passConfirmAlert1");
    if(conPass === pass || conPass.length == 0){
        animateAlert(alert1, "hide");
        updateBtnKey1(2,true);
        updateBtn();
    }else{
        animateAlert(alert1, "pop");
        updateBtnKey1(2,false);
        updateBtn();
    }

});

//Controlando os dados recebidos pelo usuário
//-------------------------------------------
document.querySelector("#loginSubmit").addEventListener("click", () => {
    email = document.querySelector("#inputEmail").value;
    password = document.querySelector("#inputPassword").value;
    console.log(firebase);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    console.log(User);
});
document.querySelector("#signUpSubmit").addEventListener("click", () => {
    User = new User(inputElement[0].value,
        inputElement[1].value
    );
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(User.email, inputElement[2].value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    console.log(User);
});
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        alert("usuário conectado");
        
    } else {
        alert("usuário desconectado");
    }
});