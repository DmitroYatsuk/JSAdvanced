function ValidationModule () {

}

ValidationModule.prototype = {
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
<<<<<<< HEAD
    
    isTrue: function (login, pwd) {
        if (login !== "" || pwd !== "") {
            if (!this.validateEmail(login)) {
                return {status: true, msg: "Wrong login format!"}
            }
            if (this.validateEmail(login)) {
                    if (localStorage.getItem('login') === login && localStorage.getItem('pwd') === pwd) {
                        return {status: true, msg: "Login has been done!"}
                    }
                    else {
                        return {status: true, msg: "Wrong credentials!"}
                    }
                }
                else {
                    showAlert("");
                }
        
            }
            else return {status: true, msg: "Login and password shouldn't be empty!"}
=======

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

    inputFormValidation: function (login, pwd) {
        if (login !== "" && pwd !== "") {
            hideAlert();
            if (validateEmail(login)) {
                if (localStorage['login'] === login && localStorage['pwd'] === pwd) {
                    hideClass(formSignin);
                    userLogin.value = login;
                    userPassword.value = pwd;
                    showClass(userData);
                }
                else {
                    showAlert("Wrong credentials!");
                }
            }
            else {
                showAlert("Wrong login format!");
            }
        }
        else {
            showAlert("Login and password shouldn't be empty!");.
        }
>>>>>>> 1de59cb25540ada45d9f5e396f9e2378a2e2bd4d
    }
}

