(function () {

    class View {
        constructor() {
            this.locators = {
                galleryView: document.getElementById("gallery-view"),
                dropdownName: document.getElementById("dropdown-name"),
                dropdownDate: document.getElementById("dropdown-date"),
                addBtn: document.getElementById("add"),
                rmBtns: document.getElementsByClassName("btn btn-danger"),
                result: document.getElementById("gallery"),
                filterOne: document.getElementById("dropdown-1"),
                filterTwo: document.getElementById("dropdown-2"),
                filterThree: document.getElementById("dropdown-3"),
                filterFour: document.getElementById("dropdown-4"),
                createForm: document.getElementById("form-create"),
                createBtn: document.getElementById("btn-create"),
                updateBtn: document.getElementById("btn-update"),
                loginInput: document.getElementById("inputEmail"),
                passwordInput: document.getElementById("inputPassword"),
                alert: document.getElementById("alert"),
                rememberMe: document.getElementById("checkbox"),
                submitBtn: document.getElementById("submit"),
                formSignin: document.getElementById("form-view"),
                quitBtn: document.getElementById("sign-out"),
                userData: document.getElementById("userData"),
                userLogin: document.getElementById("userLogin"),
                userPassword: document.getElementById("userPassword"),
                galleryBtn: document.getElementById("btn-gallery"),
                aboutUserBtn: document.getElementById("about-user"),
                nav: document.getElementById("navigation"),
                showPwdBtn: document.getElementById("showPwd"),
                formHeader: document.getElementById("form-header"),
                url: document.getElementById("url"),
                name: document.getElementById("name"),
                id: document.getElementById("id"),
                description: document.getElementById("description"),
                date: document.getElementById("date")
            };

            this.pages = [this.locators.galleryView, this.locators.formView];
            this.ready = false;
        }

        init() {
            this.galleryInitDisplay();
            this.ready = true;
        }

        galleryInitDisplay() {
            this.hideElement(this.locators.nav);
            if (this.isLoggedIn() === "true") {
                this.showGallery();
            }
            if (this.isRememberMe() === "true") {
                this.showGallery();
            }
        }

        showAlert(msg) {
            this.locators.alert.innerText = msg;
            this.locators.alert.classList.remove("hide");
            this.locators.alert.classList.add("show");
        }

        hideAlert() {
            this.locators.alert.innerText = "";
            this.locators.alert.classList.remove("show");
            this.locators.alert.classList.add("hide");
        }

        hideElement(name) {
            name.classList.remove("show");
            name.classList.add("hide");
        }

        showElement(name) {
            name.classList.remove("hide");
            name.classList.add("show");
        }

        showPage(pageName) {
            this.pages.forEach(element => {
                if (element.id === pageName) {
                    element.classList.remove("hide");
                    element.classList.add("show");
                }
                else {
                    element.classList.remove("show");
                    element.classList.add("hide");
                }
            });
        }

        showGallery() {
            this.showPage("gallery-view");
            /*             this.hideAlert();
                        this.hideElement(this.locators.formSignin);
                        this.showElement(this.locators.galleryView);
                        this.showElement(this.locators.nav); */
            //this.gallery.initComponent();
            //this.user.initComponent();

        }

        setLoggedIn(value) {
            sessionStorage.setItem('loggedIn', value);
        }

        isLoggedIn() {
            return sessionStorage.getItem('loggedIn');
        }

        setRememberMe(value) {
            localStorage.setItem('remMe', value);
        }

        isRememberMe() {
            return localStorage.getItem('remMe');
        }

        setInputValues(data) {
            this.url.value = data.url;
            this.name.value = data.name;
            this.id.value = data.id;
            this.description.value = data.description;
            this.date.value = data.date;
        }

        getInputValues() {
            return {
                url: this.url.value,
                name: this.name.value,
                id: this.id.value,
                description: this.description.value,
                date: +this.date.value
            }
        }

        isReady() {
            return this.ready;
        }
    }

    window.app = window.app || {};
    window.app.View = View;

})();