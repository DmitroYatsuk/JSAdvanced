'use strict';
const galleryLocators = {
    galleryView : document.getElementById("gallery-view"),
    dropdownName : document.getElementById("dropdown-name"),
    dropdownDate : document.getElementById("dropdown-date"),
    addBtn : document.getElementById("add"),
    rmBtns : document.getElementsByClassName("btn btn-danger"),
    result : document.getElementById("gallery"),
    filterOne : document.getElementById("dropdown-1"),
    filterTwo : document.getElementById("dropdown-2"),
    filterThree : document.getElementById("dropdown-3"),
    filterFour : document.getElementById("dropdown-4")
};

const loginFormLocators = {
    loginInput : document.getElementById("inputEmail"),
    passwordInput : document.getElementById("inputPassword"),
    alert : document.getElementById("alert"),
    submitBtn : document.getElementById("submit"),
    formSignin : document.getElementById("form-view"),
    homeBtn : document.getElementById("sign-out")
};

const userLocators = {
    userData : document.getElementById("userData"),
    userLogin : document.getElementById("userLogin"),
    userPassword : document.getElementById("userPassword"),
    showPwdBtn : document.getElementById("showPwd"),
    galleryBtn : document.getElementById("gallary"),
    aboutUserBtn : document.getElementById("about-user")
};

let validatorModule = new Validator();
let userModule = new userForm(userLocators);
let galleryModule = new BaseGallery(galleryLocators);
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule, userModule, loginFormLocators);

loginForm.initComponent();