(function () {

    class View {
        constructor() {
            this.locators = {
                loginView: document.getElementById("form-login"),
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

            this.pages = [this.locators.galleryView, this.locators.loginView, this.locators.userData];
            this.ready = false;
        }

        init() {
            if (!this.isReady()) {
                this.ready = true;
                this.hideElement(this.locators.nav);
            }
            else this.showElement(this.locators.nav);
            //this.galleryInitDisplay();
        }

        galleryInitDisplay() {
            this.hideElement(this.locators.nav);
              if (this.isLoggedIn() === "true") {
                this.showGallery(arrToDisplay);
            }
            if (this.isRememberMe() === "true") {
                this.showGallery(arrToDisplay);
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

        showGallery(arrToDisplay) {
            this.showPage("gallery-view");
            this.showResult(arrToDisplay);
        }

        showResult(arrToDisplay) {
            let resultHTML = "";
            arrToDisplay.forEach(function (car) {
                resultHTML += `
                                <div class="col-md-4">
                                    <div class="card mb-4 box-shadow">
                                    <img class="card-img-top"
                                        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="${car.name}"
                                        src="${car.url}" data-holder-rendered="true"
                                        style="height: 225px; width: 100%; display: block;">
                                    <div class="card-body">
                                        <p class="card-text">${car.name}</p>
                                        <p class="card-text">${car.description}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-outline-secondary" data-view-btn="${car.id}">View</button>
                                            <button type="button" class="btn btn-outline-secondary" data-edit-btn="${car.id}">Edit</button>
                                        </div>
                                        <a href="#" class="btn btn-danger" data-rm-btn="${car.id}">Удалить</a>
                                        <small class="text-muted">${car.date}</small>
                                        </div>
                                    </div>
                                    </div>
                                </div>`;
            }
            )
            this.locators.result.innerHTML = resultHTML;
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