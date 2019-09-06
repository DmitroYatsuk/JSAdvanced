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
        this.locators.submitBtn.addEventListener("click", this.submitHandler.bind(this));
        //this.locators.showPwdBtn.addEventListener("click", this.showPwdHandler);
        //this.locators.homeBtn.addEventListener("click", this.homeBtnHandler);
    },
    validateUserData: function () {
        this.validator.isValid(this.locators.loginInput.value, this.locators.passwordInput.value);
    },

    showGallery: function () {
        this.gallery.init();
    },

    setLogAndPass: function (login, pwd) {
        localStorage.setItem('login', login);
        localStorage.setItem('pwd', pwd);
    },

    showAlert: function (msg) {
        this.locators.alert.innerText = msg;
        this.locators.alert.classList.remove("hide");
        this.locators.alert.classList.add("show");
    },

    hideAlert: function () {
        this.locators.alert.innerText = "";
        this.locators.alert.classList.remove("show");
        this.locators.alert.classList.add("hide");
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
		this.setLogAndPass("my@mail.com", "1234");
        let retVal = this.validator.isTrue(this.locators.loginInput.value, this.locators.passwordInput.value);
        if (retVal.status === true) {
            this.hideAlert();
            this.hideClass(this.locators.formSignin);
            //let preparedData = this.gallery.prepareSourceData();
            this.gallery.initComponent();
            this.showClass(this.gallery.locators.galleryView);
        }
        else this.showAlert(retVal.msg);
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
