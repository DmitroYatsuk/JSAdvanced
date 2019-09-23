'use strict';
class userForm {
    constructor (locators) {
        this.locators = locators;
}

    initComponent () {
        this.locators.showPwdBtn.addEventListener("click", this.showPwdHandler.bind(this));
    }

    showPwdHandler (e) {
        loginForm.locators.userPassword.type = loginForm.locators.userPassword.type
            === 'password' ? 'text' : 'password';
        e.target.innerText = e.target.innerText
            === "Show password" ? 'Hide password' : 'Show password';
    }
}