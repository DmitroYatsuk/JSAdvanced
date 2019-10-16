(function() {

    function View () {        
        this.DOMElements = {
            saveBtn     : document.querySelector("#saveBtn"),
            refreshBtn  : document.querySelector("#refreshBtn")
        };

        this.ready = false;
        this.counter = 0;
    }
    
    View.prototype = {
        
        init : function (items) {
            this.items = items;
            this.buildView();
            this.ready = true;
        },
        
        buildView : function () {
            console.log("View is ready");
            console.log(this.items);
        },

        getItemToSave : function(){
            let item = this.items[0];
            item.name = "iPhone";
            return item;
        },

        setSavedData : function (data) {
            console.log("View item is successfully saved!");
            console.table(data);
        },

        setUpdatedData : function (data) {
            console.log("View item is successfully updated!");
            console.table(data);
        },

        isReady : function (){
            return this.ready;
        }
    }
    
    window.app = window.app || {};
    window.app.View = View;

}());
