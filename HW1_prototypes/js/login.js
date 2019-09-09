'use strict';
let LoginForm = function (validatorModule, galleryModule, userModule, locators) {
    this.validator = validatorModule;
    this.gallery = galleryModule;
    this.user = userModule;
    this.locators = locators;

    let loginData = {
        login: "",
        password: ""
    };
}



LoginForm.prototype = {

    initComponent: function () {
        this.locators.submitBtn.addEventListener("click", this.submitHandler.bind(this));
        this.locators.homeBtn.addEventListener("click", this.homeBtnHandler.bind(this));
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
            this.gallery.initComponent();
            this.user.initComponent();
            this.showClass(this.gallery.locators.galleryView);
        }
        else this.showAlert(retVal.msg);
    },

    homeBtnHandler: function () {
        this.locators.loginInput.value = "";
        this.locators.passwordInput.value = "";
        this.showClass(this.locators.formSignin);
        this.hideClass(this.locators.userData);
    }
}
