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

//Controlando todas as mensagens de input obrigatório
//---------------------------------------------------
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
    }).then( () => {
        firebase.auth().currentUser.updateProfile({
            displayName: User.name
        }).then(function() {
            console.log("Profile updated successfully!");
        }, function(error) {
            // An error happened.
        })
    });
});
