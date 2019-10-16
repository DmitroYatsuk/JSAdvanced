(function() {

    let url = 'https://gist.githubusercontent.com/dreemius/43cdd564d20ddfe27ba4741153c14b00/raw/2dd6313ea3e74672d9d670646a816644188b6351/phones.json';
    
    let observer = new window.app.Observer;
    let model = new window.app.Model(url);
    let view = new window.app.View;
    
    let Controller = window.app.Controller;
    let controller = new Controller(model, view, observer)
    controller.init();

}());