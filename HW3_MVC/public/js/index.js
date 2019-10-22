(function() {

    let url = 'https://gist.githubusercontent.com/DmitroYatsuk/7739a7e4097efe82682d4390b7df2321/raw/5c4575af4434c4e569ab7a47dc12748dec38dc80/phones.json';

    let validator = new window.app.Validator();
    let model = new window.app.Model(url);
    let view = new window.app.View();
    let controller = new window.app.Controller(model, view, validator);
    controller.init();

})();