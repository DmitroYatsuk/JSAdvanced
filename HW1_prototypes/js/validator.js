function ValidationModule () {

}

ValidationModule.prototype = {
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    
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
    }
}

