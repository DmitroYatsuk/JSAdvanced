'use strict';
const locators = {
    galleryView: document.getElementById("gallery-view"),
    dropdownName: document.getElementById("dropdown-name"),
    dropdownDate: document.getElementById("dropdown-date"),
    addBtn: document.getElementById("add"),
    rmBtns: document.getElementsByClassName("btn btn-danger"),
    result: document.getElementById("gallery"),
    filterOne: document.getElementById("dropdown-1"),
    filterTwo: document.getElementById("dropdown-2"),
    filterThree: document.getElementById("dropdown-3"),
    filterFour: document.getElementById("dropdown-4"),
    createForm: document.getElementById("form-create"),
    createBtn: document.getElementById("btn-create"),
    updateBtn: document.getElementById("btn-update"),
    loginInput: document.getElementById("inputEmail"),
    passwordInput: document.getElementById("inputPassword"),
    alert: document.getElementById("alert"),
    rememberMe: document.getElementById("checkbox"),
    submitBtn: document.getElementById("submit"),
    formSignin: document.getElementById("form-view"),
    quitBtn: document.getElementById("sign-out"),
    userData: document.getElementById("userData"),
    userLogin: document.getElementById("userLogin"),
    userPassword: document.getElementById("userPassword"),
    galleryBtn: document.getElementById("btn-gallery"),
    aboutUserBtn: document.getElementById("about-user"),
    nav: document.getElementById("navigation"),
    showPwdBtn: document.getElementById("showPwd")
};

const pagesLocators = [locators.galleryView, locators.formView];

//let config = new Config();
let service = new Service();
let validatorModule = new Validator();
let userModule = new UserForm(locators);
let galleryModule = new ExtendedGallery(locators);

let loginForm = new LoginForm({ login: "my@mail.com", pwd: "12345678" }, validatorModule, galleryModule, userModule, locators);

loginForm.initComponent();