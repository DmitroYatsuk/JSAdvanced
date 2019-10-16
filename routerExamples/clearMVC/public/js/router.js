(function() {
    let main = document.querySelector("#main-view");
    let info = document.querySelector("#info-view");
    let login = document.querySelector("#login-view");
    let utils = window.app.Utils;
    let activatedRoutes = {};

    let routeConfig = {
        "" : {
            show : () => {
                utils.showView(login);
                utils.hideAllView([main, info]);
            },
            init : () => {
                let model = new window.app.LoginModel();
                let view = new window.app.LoginView;
                new window.app.LoginController(model, view)
            }
        },
        "gallery" : {
            show : () => {
                utils.showView(main);
                utils.hideAllView([login, info]);
                console.log("Main route is loaded")
            },
            init : () => {
                let observer = new window.app.Observer;
                let model = new window.app.GalleryModel();
                let view = new window.app.GalleryView;
                new window.app.GalleryController(model, view, observer)
            }
        },
        "info" : {
            show : () => {
                utils.showView(info);
                utils.hideAllView([main, login]);
                console.log("Info route is loaded")
            },
            init : () => {
                //implement Controller, View and Model for this Route
            }
        }
    }

    function updateRoute() {
        let routeName = document.location.hash.replace(/^#/, '');
        if (activatedRoutes[routeName]) {
            activatedRoutes[routeName]();
        } else {
            let route = routeConfig[routeName];
            if (route) {
                route.init();
                route.show();
                activatedRoutes[routeName] = route.show;
            }
        }
    }
    
    window.app = window.app || {};
    window.app.Router = {updateRoute: updateRoute};
}());