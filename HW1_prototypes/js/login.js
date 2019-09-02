const loginInput = document.getElementById("inputEmail"),
	passwordInput = document.getElementById("inputPassword"),
	alert = document.getElementById("alert"),
	submitBtn = document.getElementById("submit"),
	formSignin = document.getElementById("form"),
	userData = document.getElementById("userData"),
	userLogin = document.getElementById("userLogin"),
	userPassword = document.getElementById("userPassword"),
	showPwdBtn = document.getElementById("showPwd"),
	homeBtn = document.getElementById("home");


let LoginForm = function (validatorModule, galleryModule) {
	this.validator = validatorModule;
	this.gallery = galleryModule;

	let loginData = {
		login: "",
		password: ""
	};

	let setLogAndPass = function (login, pwd) {
        localStorage.setItem('login') = login;
        localStorage.setItem('pwd') = pwd;
	};

    function showAlert(msg) {
        alert.innerText = msg;
        alert.classList.remove("hide");
        alert.classList.add("show");
    }

    function hideAlert() {
        alert.classList.remove("show");
        alert.classList.add("hide");
    }

    function hideClass(name) {
        name.classList.remove("show");
        name.classList.add("hide");
    }

    function showClass(name) {
        name.classList.remove("hide");
        name.classList.add("show");
    }

    function inputFormValidation(login, pwd) {
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

    let submitHandler = function (e) {
        e.preventDefault();
        inputFormValidation(loginInput.value, passwordInput.value);
    };

    let showPwdHandler = function (e) {
        userPassword.type === 'password' 
        ? userPassword.type = 'text' : userPassword.type = 'password';
        e.target.innerText === "Show password" 
        ? e.target.innerText = 'Hide password' : e.target.innerText = 'Show password';
    };

    let homeBtnHandler = function () {
        loginInput.value = "";
        passwordInput.value = "";
        showClass(formSignin);
        hideClass(userData);
    };
}



LoginForm.prototype = {

	initComponent: function () {
		submitBtn.addEventListener("click", submitHandler);
		showPwdBtn.addEventListener("click", showPwdHandler);
		homeBtn.addEventListener("click", homeBtnHandler);
	},
	validateUserData: function () {
		this.validator.isValid();
	},

	showGallery: function () {
		this.gallery.init();
	}
}
