function ValidationModule () {

}

ValidationModule.prototype = {
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
    }
}

