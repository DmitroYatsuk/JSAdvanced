'use strict';
let userForm = function (locators) {
    this.locators = locators;
}

userForm.prototype = {

    initComponent: function () {
        this.locators.galleryBtn.addEventListener("click", this.goToGalleryHandler);
        this.locators.aboutUserBtn.addEventListener("click", this.goToUserHandler);
        this.locators.showPwdBtn.addEventListener("click", this.showPwdHandler);
    },

    showPwdHandler: function (e) {
        this.locators.userPassword.type = this.locators.userPassword.type
            === 'password' ? 'text' : 'password';
        this.locators.e.target.innerText = this.locators.e.target.innerText
            === "Show password" ? 'Hide password' : 'Show password';
    },

    goToGalleryHandler: function (e) {
        loginForm.hideClass(this.userData);
        loginForm.showClass(galleryModule.locators.galleryView);
    },

    goToUserHandler: function (e) {
        loginForm.hideClass(this.locators.galleryBtn);
        loginForm.showClass(this.userData);
    }
}