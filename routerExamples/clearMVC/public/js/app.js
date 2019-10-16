(function() {
    
    let router = window.app.Router;
    
    window.addEventListener('load', router.updateRoute);
    window.addEventListener('hashchange', router.updateRoute);

}());