'use strict';
class LoginForm {
    constructor(loginPwd, validatorModule, galleryModule, userModule, locators) {
        this.validator = validatorModule;
        this.gallery = galleryModule;
        this.user = userModule;
        this.locators = locators;
        this.loginPwd = loginPwd;
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

    hideClass(name) {
        name.classList.remove("show");
        name.classList.add("hide");
    }

    showClass(name) {
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
        this.hideAlert();
        this.hideClass(this.locators.formSignin);
        this.gallery.initListeners();
        this.user.initComponent();
        this.showClass(this.gallery.locators.galleryView);
    }

    submitHandler(e) {
        e.preventDefault();
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
        this.showClass(this.locators.formSignin);
        this.hideClass(this.locators.userData);
        this.hideClass(this.gallery.locators.galleryView);
        this.setLoggedIn(false);
        this.setRememberMe(false);
    }

    goToGalleryHandler(e) {
        this.hideClass(this.locators.userData);
        this.showClass(this.gallery.locators.galleryView);
    }

    goToUserHandler(e) {
        this.hideClass(this.gallery.locators.galleryView);
        this.locators.userLogin.value = this.loginPwd.login;
        this.locators.userPassword.value = this.loginPwd.pwd;
        this.showClass(this.locators.userData);
    }

    galleryInitDisplay() {
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