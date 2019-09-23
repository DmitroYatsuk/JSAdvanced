'use strict';
let userForm = function (locators) {
    this.locators = locators;
}

userForm.prototype = {
    initComponent: function () {
        this.locators.showPwdBtn.addEventListener("click", this.showPwdHandler.bind(this));
    },
    showPwdHandler: function (e) {
        loginForm.locators.userPassword.type = loginForm.locators.userPassword.type
            === 'password' ? 'text' : 'password';
        e.target.innerText = e.target.innerText
            === "Show password" ? 'Hide password' : 'Show password';
    },
}