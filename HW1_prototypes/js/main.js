'use strict';
const galleryLocators = {
    galleryView : document.getElementById("gallery-view"),
    dropdownName : document.getElementById("dropdown-name"),
    dropdownDate : document.getElementById("dropdown-date"),
    addBtn : document.getElementById("add"),
    result : document.getElementById("gallery"),
    filterOne : document.getElementById("dropdown-1"),
    filterTwo : document.getElementById("dropdown-2"),
    filterThree : document.getElementById("dropdown-3"),
    filterFour : document.getElementById("dropdown-4"),
    //count : document.getElementById("count"),
    //arrToDisplay : []
};

const loginFormLocators = {
    loginInput : document.getElementById("inputEmail"),
    passwordInput : document.getElementById("inputPassword"),
    alert : document.getElementById("alert"),
    submitBtn : document.getElementById("submit"),
    formSignin : document.getElementById("form-view")
};

const userInfoLocators = {
    
    userData : document.getElementById("userData"),
    userLogin : document.getElementById("userLogin"),
    userPassword : document.getElementById("userPassword"),
    showPwdBtn : document.getElementById("showPwd"),
    homeBtn : document.getElementById("home")
};

let validatorModule = new Validator();

let galleryModule = new BaseGallery(galleryLocators);
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, loginFormLocators);

loginForm.initComponent();