'use strict';
let LoginForm = function (validatorModule, galleryModule, locators) {
    this.validator = validatorModule;
    this.gallery = galleryModule;
    this.locators = locators;

    let loginData = {
        login: "",
        password: ""
    };
}



LoginForm.prototype = {

    initComponent: function () {
        this.locators.submitBtn.addEventListener("click", this.submitHandler);
        //this.locators.showPwdBtn.addEventListener("click", this.showPwdHandler);
        //this.locators.homeBtn.addEventListener("click", this.homeBtnHandler);
    },
    validateUserData: function () {
        this.validator.isValid();
    },

    showGallery: function () {
        this.gallery.init();
    },

    setLogAndPass: function (login, pwd) {
        localStorage.setItem('login') = login;
        localStorage.setItem('pwd') = pwd;
    },

    showAlert: function (msg) {
        alert.innerText = msg;
        alert.classList.remove("hide");
        alert.classList.add("show");
    },

    hideAlert: function () {
        alert.classList.remove("show");
        alert.classList.add("hide");
    },

    hideClass: function (name) {
        name.classList.remove("show");
        name.classList.add("hide");
    },

    showClass: function (name) {
        name.classList.remove("hide");
        name.classList.add("show");
    },

    submitHandler: function (e) {
        e.preventDefault();
        validatorModule.isTrue( locators.loginInput.value,  locators.passwordInput.value);
    },

    showPwdHandler: function (e) {
        userPassword.type = userPassword.type === 'password'
            ? 'text' : 'password';
        e.target.innerText = e.target.innerText === "Show password"
            ? 'Hide password' : 'Show password';
    },

    homeBtnHandler: function () {
        loginInput.value = "";
        passwordInput.value = "";
        showClass(formSignin);
        hideClass(userData);
    }
}
