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

// function loadUserMenu(){
//        $("login-btn").addClass("off");
//        $("user-btn").removeClass("off");
// }