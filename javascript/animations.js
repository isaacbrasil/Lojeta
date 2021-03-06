function animateSignUp() {
    $("#loginContent").animate({
        opacity: '0%'
    });
    $("#signUpContent").animate({
        opacity: '100%'
    });
    $("#loginContent").css("z-index", "-1");
    $("#signUpContent").css("z-index", "1");
}
function animateLogin() {
    $("#signUpContent").animate({
        opacity: '0%'
    });
    $("#loginContent").animate({
        opacity: '100%'
    });
    $("#signUpContent").css("z-index", "-1");
    $("#loginContent").css("z-index", "1");
}
function animateAlert(element, type){
  element = $(element);
  if(type == "pop"){
    element.animate({
        height: '20px'
    });
  }else if(type == "hide"){
      element.animate({
        height: '0px'
      });
    }
}