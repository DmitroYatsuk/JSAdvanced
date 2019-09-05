'use strict';
const galleryLocators = {
    galleryView : document.getElementById("gallery-view"),
    dropdownName : document.getElementById("dropdown-name"),
    dropdownDate : document.getElementById("dropdown-date"),
    addBtn : document.getElementById("add"),
    result : document.getElementById("gallery"),
    filter : document.getElementById("filter-selector"),
    count : document.getElementById("count"),
    arrToDisplay : []
};

const loginFormLocators = {
    loginInput : document.getElementById("inputEmail"),
    passwordInput : document.getElementById("inputPassword"),
    alert : document.getElementById("alert"),
    submitBtn : document.getElementById("submit"),
};

const userInfoLocators = {
    formSignin : document.getElementById("form"),
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
galleryModule.initComponent();