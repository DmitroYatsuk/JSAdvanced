(function() {

    class LoginController { 
        constructor(model, view, observer) {
            this.model = model;
            this.view = view;
        } 

        bindEvents() { }

        init() { }
        
    }

    window.app = window.app || {};
    window.app.LoginController = LoginController;

}());
