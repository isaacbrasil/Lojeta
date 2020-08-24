firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.displayName);
        console.log(user.email);
       	document.querySelector("#login-btn").classList.add("off");
       	document.querySelector("#user-btn").classList.remove("off");
       	console.log(window.location.pathname);

       	if (window.location.pathname === "/account/orders/") {
       		loadOrders();
       	} else if(window.location.pathname === "/account/") {
          loadUserData();
        }
    } else {
       	document.querySelector("#login-btn").classList.remove("off");
       	document.querySelector("#user-btn").classList.add("off");
    }
});