(function() {

    let url = 'https://gist.githubusercontent.com/DmitroYatsuk/7739a7e4097efe82682d4390b7df2321/raw/fc5f353377f0daa3fefcd28002613561756de75f/cars.json';

    let validator = new window.app.Validator();
    let model = new window.app.Model(url);
    let view = new window.app.View();
    let controller = new window.app.Controller(model, view, validator);
    controller.init();

})();