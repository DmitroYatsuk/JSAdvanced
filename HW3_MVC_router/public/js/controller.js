(function () {

    class Controller {
        constructor(model, view, validator) {
            this.model = model;
            this.view = view;
            this.validator = validator;
        }

        initListeners() {
            this.view.locators.submitBtn.addEventListener("click", this.submitHandler.bind(this));
            this.view.locators.quitBtn.addEventListener("click", this.quitBtnHandler.bind(this));
            this.view.locators.galleryBtn.addEventListener("click", this.goToGalleryHandler.bind(this));
            this.view.locators.aboutUserBtn.addEventListener("click", this.goToUserHandler.bind(this));
            this.view.locators.showPwdBtn.addEventListener("click", this.showPwdHandler.bind(this));
            this.view.locators.addBtn.addEventListener("click", this.addBtnHandler.bind(this));
            this.view.locators.filterOne.addEventListener("click", this.filterHandler.bind(this));
            this.view.locators.filterTwo.addEventListener("click", this.filterHandler.bind(this));
            this.view.locators.filterThree.addEventListener("click", this.filterHandler.bind(this));
            this.view.locators.filterFour.addEventListener("click", this.filterHandler.bind(this));
            this.view.locators.createBtn.addEventListener("click", this.createBtnHandler.bind(this));
            this.view.locators.updateBtn.addEventListener("click", this.updateBtnHandler.bind(this));
            //this.view.locators.result.addEventListener("click", this.viewFormBtnHandler.bind(this));
            this.view.locators.result.addEventListener("click", this.editFormBtnHandler.bind(this));
            this.view.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
        }

        submitHandler(e) {
            e.preventDefault();
            this.isUserLogined(this.view.locators.loginInput.value, this.view.locators.passwordInput.value)
            .then(data => {
                if (data.status === false) {
                    this.view.showAlert(data.msg);
                }
                else {
                    this.view.setLoggedIn(true);
                    if (this.view.locators.rememberMe.checked === true) {
                        this.view.setRememberMe(true);
                    }
                    else this.view.setRememberMe(false);
                    this.model.prepareSourceData()
                    .then(data => this.view.showGallery(data));
                }
            });
        }

        isUserLogined(login, pwd) {
            if (login == "" || pwd == "") {
                return Promise.resolve({ status: false, msg: "Login and password shouldn't be empty!" });
            }
            if (!this.validator.validateEmail(login)) {
                return Promise.resolve({ status: false, msg: "Wrong login format!" });
            }
            if (pwd.length < 8) {
                return Promise.resolve({ status: false, msg: "Password is too short!" });
            }
            else {
                return this.model.fetchCredentials().then(data => {
                    if (data.login === login && data.password === pwd) {
                        return { status: true, msg: "Login has been done!" };
                    }
                    else return { status: false, msg: "Wrong credentials!" };
                })
            }
        }

        quitBtnHandler(e) {
            this.view.locators.loginInput.value = "";
            this.view.locators.passwordInput.value = "";
            this.view.showPage("form-login");
            this.view.hideElement(this.view.locators.nav);
            this.view.setLoggedIn(false);
            this.view.setRememberMe(false);
        }

        goToGalleryHandler(e) {
            this.view.showPage("gallery-view");
        }

        goToUserHandler(e) {
            this.model.fetchCredentials()
            .then(data => {
                this.view.locators.userLogin.value =  data.login;
                this.view.locators.userPassword.value = data.password;
            });
            this.view.showPage("userData");
        }

        showPwdHandler(e) {
            this.view.locators.userPassword.type = this.view.locators.userPassword.type
                === 'password' ? 'text' : 'password';
            e.target.innerText = e.target.innerText
                === "Show password" ? 'Hide password' : 'Show password';
        }

        addBtnHandler(e) {
            this.view.showCreatePage();
        }

        filterHandler(e) {
            this.model.filterCards(e.target.id);
            this.view.showResult(data);
        }

        createBtnHandler(e) {
            this.model.createItem(this.view.getInputValues())
            .then(data => this.view.showGallery(data));
        }

        updateBtnHandler(e) {
            this.model.updateItem(this.view.getInputValues())
            .then(data => this.view.showGallery(data));
        }

        editFormBtnHandler(e) {
            if (!e.target.attributes["data-edit-btn"]) {
                return;
            }
            this.model.fetchData(e.target.attributes["data-edit-btn"].nodeValue)
            .then(data => this.view.setInputValues(data));
            this.view.showEditPage();
        }

        removeBtnHandler(e) {
            if (!e.target.attributes["data-rm-btn"]) {
                return;
            }
            this.model.deleteItem(e.target.attributes["data-rm-btn"].nodeValue)
            .then(data => this.view.showGallery(data));
        }

        init() {
            this.model.prepareSourceData()
                .then(data => {
                    this.view.galleryInitDisplay(data);
                    this.initListeners();              
                });
        }

    }

    window.app = window.app || {};
    window.app.Controller = Controller;

})();