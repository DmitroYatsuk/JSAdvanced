(function() {

    class Controller {
        constructor(model, view) {
            this.model = model;
            this.view = view;
            //this.observer = observer;
        }     
        
        initListeners() {
            this.view.locators.submitBtn.addEventListener("click", this.submitHandler.bind(this));
            this.view.locators.quitBtn.addEventListener("click", this.quitBtnHandler.bind(this));
            this.view.locators.galleryBtn.addEventListener("click", this.goToGalleryHandler.bind(this));
            this.view.locators.aboutUserBtn.addEventListener("click", this.goToUserHandler.bind(this));
        }
        
        submitHandler(e) {
            e.preventDefault();
            let retVal = this.validator.isTrue(this.view.locators.loginInput.value, this.view.locators.passwordInput.value);
            if (retVal.status === true) {
                this.view.setLoggedIn(true);
                if (this.view.locators.rememberMe.checked === true) {
                    this.view.setRememberMe(true);
                }
                else this.view.setRememberMe(false);
                this.showGallery();
            }
            else this.showAlert(retVal.msg);
        }
    
        quitBtnHandler() {
            this.view.locators.loginInput.value = "";
            this.view.locators.passwordInput.value = "";
            this.view.showPage(formSignin);
/*             this.showElement(this.view.locators.formSignin);
            this.hideElement(this.view.locators.userData);
            this.hideElement(this.view.locators.galleryView); */
            this.view.setLoggedIn(false);
            this.view.setRememberMe(false);
        }
    
        goToGalleryHandler(e) {
/*             this.hideElement(this.view.locators.userData);
            this.showElement(this.view.locators.galleryView); */
            this.view.showPage(galleryView);
        }
    
        goToUserHandler(e) {
            this.view.locators.userLogin.value = this.loginPwd.login;
            this.view.locators.userPassword.value = this.loginPwd.pwd;
/*             this.hideElement(this.view.locators.galleryView);
            this.showElement(this.view.locators.userData); */
            this.view.showPage(userData);
        }
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

})();