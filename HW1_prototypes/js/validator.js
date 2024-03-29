'use strict';
let Validator = function (loginData) {
    //this.loginData = loginData;
}

Validator.prototype = {
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    isTrue: function (login, pwd) {
        if (login !== "" || pwd !== "") {
            if (this.validateEmail(login)) {
                if (pwd.length >= 8) {
                    if (loginForm.loginPwd.login === login && loginForm.loginPwd.pwd === pwd) {
                        return { status: true, msg: "Login has been done!" };
                    }
                    else return { status: false, msg: "Wrong credentials!" };
                }
                else return { status: false, msg: "Password is too short!" };
            }
            else return { status: false, msg: "Wrong login format!" };
        }
        else return { status: false, msg: "Login and password shouldn't be empty!" };
    }
}

