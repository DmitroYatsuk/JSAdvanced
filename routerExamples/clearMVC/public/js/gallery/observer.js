(function() {

    class Observer {
        constructor() {
            this.events = {};
        }

        subscribeEvent(name, func) {
            this.events[name] = func;
        }
        
        callEvent(name, arg) {
            if (this.events[name]) {
                this.events[name](arg);
            }
        }
    }

    window.app = window.app || {};
    window.app.Observer = Observer;

}());