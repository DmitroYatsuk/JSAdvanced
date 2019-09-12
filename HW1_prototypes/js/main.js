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

const loginLocators = {
    loginInput : document.getElementById("inputEmail"),
    passwordInput : document.getElementById("inputPassword"),
    alert : document.getElementById("alert"),
    rememberMe : document.getElementById("checkbox"),
    submitBtn : document.getElementById("submit"),
    formSignin : document.getElementById("form-view"),
    quitBtn : document.getElementById("sign-out"),
    userData : document.getElementById("userData"),
    userLogin : document.getElementById("userLogin"),//
    userPassword : document.getElementById("userPassword"),//
    galleryBtn : document.getElementById("gallary"),
    aboutUserBtn : document.getElementById("about-user")
};

const userLocators = {
    showPwdBtn : document.getElementById("showPwd")
};

let validatorModule = new Validator();
let userModule = new userForm(userLocators);
let galleryModule = new BaseGallery(galleryLocators);
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm({login:"my@mail.com", pwd:"12345678"}, validatorModule, galleryModule, userModule, loginLocators);

loginForm.initComponent();