(function() {

    class Controller { 
        constructor(model, view, observer) {
            this.model = model;
            this.view = view;
            this.observer = observer;
        }        
        bindEvents() {
            this.view.DOMElements.saveBtn.addEventListener("click", () => {
                let item = this.view.getItemToSave();
                this.model.saveData(item).then(data => this.view.setSavedData(data));
            });
            this.view.DOMElements.refreshBtn.addEventListener("click", () => {
                let count = this.view.counter++;
                this.observer.callEvent("update", count);
            });
        }

        bindSubscribers() {
            this.observer.subscribeEvent("update", (count) => {
                this.model.updateData(count).then((data) => {
                    this.view.setUpdatedData(data);
                });    
            });     
        }  
        
        initView(data) {
            if(!this.view.isReady()) {
                this.view.init(data);   
            }
            //this.view.isReady() || this.view.init(data);
        }
        
        init() {
            this.model.getData().then((data) => {
                this.initView(data);
                this.bindSubscribers();
                this.bindEvents();
            });    
        }
        
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

}());
