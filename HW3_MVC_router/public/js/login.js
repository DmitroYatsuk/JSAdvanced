'use strict';
class LoginForm {
    constructor(loginPwd, validatorModule, galleryModule, userModule, locators) {
        this.validator = validatorModule;
        this.gallery = galleryModule;
        this.user = userModule;
        this.locators = locators;
        this.loginPwd = loginPwd;
        //this.loginPwd = {};
    }

    initListeners() {
        this.locators.submitBtn.addEventListener("click", this.submitHandler.bind(this));
        this.locators.quitBtn.addEventListener("click", this.quitBtnHandler.bind(this));
        this.locators.galleryBtn.addEventListener("click", this.goToGalleryHandler.bind(this));
        this.locators.aboutUserBtn.addEventListener("click", this.goToUserHandler.bind(this));
    }

    showAlert(msg) {
        this.locators.alert.innerText = msg;
        this.locators.alert.classList.remove("hide");
        this.locators.alert.classList.add("show");
    }

    hideAlert() {
        this.locators.alert.innerText = "";
        this.locators.alert.classList.remove("show");
        this.locators.alert.classList.add("hide");
    }

    hideElement(name) {
        name.classList.remove("show");
        name.classList.add("hide");
    }

    showElement(name) {
        name.classList.remove("hide");
        name.classList.add("show");
    }

    setLoggedIn(value) {
        sessionStorage.setItem('loggedIn', value);
    }

    isLoggedIn() {
        return sessionStorage.getItem('loggedIn');
    }

    setRememberMe(value) {
        localStorage.setItem('remMe', value);
    }

    isRememberMe() {
        return localStorage.getItem('remMe');
    }

    showGallery() {
        service.showPage("gallery-view", pagesLocators);
        //this.hideAlert();
        //this.hideElement(this.locators.formSignin);
        this.gallery.initComponent();
        this.user.initComponent();
        //this.showElement(this.locators.galleryView);
        //this.showElement(this.locators.nav);
    }

    submitHandler(e) {
        e.preventDefault();
        //let retVal = this.validator.isTrue(this.locators.loginInput.value, this.locators.passwordInput.value);
        //this.loginPwd = service.fetchCredentials();
        let retVal = this.validator.isTrue(this.locators.loginInput.value, this.locators.passwordInput.value);
        if (retVal.status === true) {
            this.setLoggedIn(true);
            if (this.locators.rememberMe.checked === true) {
                this.setRememberMe(true);
            }
            else this.setRememberMe(false);
            this.showGallery();
        }
        else this.showAlert(retVal.msg);
    }

    quitBtnHandler() {
        this.locators.loginInput.value = "";
        this.locators.passwordInput.value = "";
        this.showElement(this.locators.formSignin);
        this.hideElement(this.locators.userData);
        this.hideElement(this.locators.galleryView);
        this.setLoggedIn(false);
        this.setRememberMe(false);
    }

    goToGalleryHandler(e) {
        this.hideElement(this.locators.userData);
        this.showElement(this.locators.galleryView);
    }

    goToUserHandler(e) {
        this.hideElement(this.locators.galleryView);
        this.locators.userLogin.value = this.loginPwd.login;
        this.locators.userPassword.value = this.loginPwd.pwd;
        this.showElement(this.locators.userData);
    }

    galleryInitDisplay() {
        this.hideElement(this.locators.nav);
        if (this.isLoggedIn() === "true") {
            this.showGallery();
        }
        if (this.isRememberMe() === "true") {
            this.showGallery();
        }
    }

    initComponent() {
        this.initListeners();
        this.galleryInitDisplay();
    }
}