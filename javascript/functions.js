
var database = firebase.database();
var auth = firebase.auth();


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

function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    console.log(User);
}
function signUp(User, password){
    auth.createUserWithEmailAndPassword(User.email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }).then( () => {
        auth.currentUser.updateProfile({
            displayName: User.name
        }).then(function() {
            console.log("Profile updated successfully!");
        }, function(error) {
            // An error happened.
        });
        database.ref('users/' + auth.currentUser.uid).set({
            username: User.name,
            email: User.email,
            "deliveryAdress" : {},
            "billingAdress" : {}
        }).then(function() {
            console.log("Database updated successfully!");
        }, function(error) {
            // An error happened.
        });;
    });
}
function loadOrders () {
    var userId = auth.currentUser.uid;
    console.log(userId);
    database.ref('users/' + userId + '/orders').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        document.querySelector("#orders").insertAdjacentHTML('afterend', `<p>${childData.product}</p>`);
      });
    });
    // document.querySelector(".orders").insertAdjacentHTML('afterend', `<p>${}</p>`);
}
function loadUserData () {
    var userId = auth.currentUser.uid;
    console.log(userId);
    database.ref('users/' + userId).once('value', function(snapshot) {
      document.querySelector("#userData").insertAdjacentHTML('afterend', `
        <p>${snapshot.val().username}</p>
        <p>${snapshot.val().email}</p>
        `);
    });
}