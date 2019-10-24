(function () {

    class Controller {
        constructor(model, view, validator) {
            this.model = model;
            this.view = view;
            this.validator = validator;
            this.arrToDisplay = [];
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
            //this.view.locators.result.addEventListener("click", this.editFormBtnHandler.bind(this));
            //this.view.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
        }

        submitHandler(e) {
            e.preventDefault();
            let retVal = this.isUserLogined(this.view.locators.loginInput.value, this.view.locators.passwordInput.value);
            retVal.then(data => {
                if (data.status === false) {
                    this.view.showAlert(data.msg);
                }
                else {
                    this.view.setLoggedIn(true);
                    if (this.view.locators.rememberMe.checked === true) {
                        this.view.setRememberMe(true);
                    }
                    else this.view.setRememberMe(false);
                    this.view.showGallery(this.arrToDisplay);
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
            this.view.showPage("formSignin");
            /*             this.showElement(this.view.locators.formSignin);
                        this.hideElement(this.view.locators.userData);
                        this.hideElement(this.view.locators.galleryView); */
            this.view.setLoggedIn(false);
            this.view.setRememberMe(false);
        }

        goToGalleryHandler(e) {
            /*             this.hideElement(this.view.locators.userData);
                        this.showElement(this.view.locators.galleryView); */
            this.view.showPage("galleryView");
        }

        goToUserHandler(e) {
            this.view.locators.userLogin.value = this.loginPwd.login;
            this.view.locators.userPassword.value = this.loginPwd.pwd;
            /*             this.hideElement(this.view.locators.galleryView);
                        this.showElement(this.view.locators.userData); */
            this.view.showPage("userData");
        }

        showPwdHandler(e) {
            this.view.locators.userPassword.type = this.view.locators.userPassword.type
                === 'password' ? 'text' : 'password';
            e.target.innerText = e.target.innerText
                === "Show password" ? 'Hide password' : 'Show password';
        }

        addBtnHandler(e) {
            /* this.view.hideElement(this.view.locators.galleryView);
            this.view.hideElement(this.view.locators.updateBtn);
            this.view.showElement(this.view.locators.createForm); */
            this.view.showPage("createForm");
        }

        filterHandler(e) {
            this.filterCards(e.target.id);
            this.showResult();
        }

        setFilterType(filterValue) {
            localStorage.setItem('filter', filterValue);
        }

        getFilterType() {
            let filterValue = localStorage.getItem('filter');
            if (filterValue === null) {
                this.setFilterType("dropdown-1");
                return "dropdown-1";
            }
            else return filterValue;

        }

        filterCards(filterValue) {
            this.setFilterType(filterValue);
            switch (filterValue) {
                case "dropdown-1":
                    this.arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
                    return;
                case "dropdown-2":
                    this.arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
                    return;
                case "dropdown-3":
                    this.arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
                    return;
                case "dropdown-4":
                    this.arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
                    return;
            }
        }

        createBtnHandler(e) {
            this.model.createItem(this.getInputValues());
            /*             this.view.hideElement(this.view.locators.createForm);
                        this.view.showElement(this.view.locators.galleryView); */
            this.view.showPage("");
        }

        updateBtnHandler(e) {
            this.model.updateItem(this.getInputValues());
            /* this.view.hideElement(this.view.locators.createForm);
            this.view.showElement(this.view.locators.galleryView); */
            this.view.showPage("");
        }

        editFormBtnHandler(e) {
            if (!e.target.attributes["data-edit-btn"]) {
                return;
            }
            this.view.formHeader.innerHTML = "Edit element form";
            this.model.getRawData(e.target.attributes["data-edit-btn"].nodeValue);
            /* 
            this.view.hideElement(this.view.locators.galleryView);
            this.view.showElement(this.view.locators.createForm); */
            this.view.showElement(this.view.locators.updateBtn);
            this.view.hideElement(this.view.locators.createBtn);
            this.view.showPage("createForm");
        }

        removeBtnHandler(e) {
            if (!e.target.attributes["data-rm-btn"]) {
                return;
            }
            this.model.deleteItem(e.target.attributes["data-rm-btn"].nodeValue);
        }

        initView(data) {
            if (!this.view.isReady()) {
                this.view.init(data);
            }
        }

        init() {
            this.model.prepareSourceData()
                .then(() => {
                    this.initView();
                    this.initListeners();
                }
                );

        }
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

})();