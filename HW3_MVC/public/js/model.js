(function () {

    class Model {
        constructor(url) {
            this.url = url;
        }

        shrinkString(str) {
            return (str.length >= 15)
                ? str.substring(0, 15) + "..."
                : str;
        }


        fetchData(id, options, fn) {
            fetch(`http://localhost:3000/cars/${id}`, options)
                .then(response => response.json())
                .then(data => {
                    fn(data);
                });
        }

        getOptionData(reqType, bodyData) {
            return {
                method: `${reqType}`,
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(bodyData)
            }
        }

        fetchCredentials() {
            return fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    return data.user;
                });
        }

        mapData(data) {
            let newArr = [];
            data.forEach(item => {
                newArr.push({
                    url: item.url,
                    name: item.name,
                    id: item.id,
                    description: item.description,
                    date: item.date,
                })
            })

            let mappedArr = newArr.map(item => {
                return {
                    url: `http://${item.url}`,
                    name: item.name.charAt(0).toLocaleUpperCase() + `${item.name}`.slice(1).toLowerCase(),
                    id: item.id,
                    description: this.model.shrinkString(item.description),
                    date: moment(item.date).format("YYYY/MM/DD HH:mm"),
                }
            })
            this.saveData(mappedArr);
            this.filterCards(this.getFilterType());
            this.showResult();
        }

        getRawData(id) {
            this.fetchData(id, null, this.setInputValues.bind(this));
        }

        updateItem(data) {
            let options = this.model.getOptionData("PUT", data);
            this.model.fetchData(data.id, options, this.prepareSourceData.bind(this));
        }
//ToDo: replace callback fn call in fetchData()
        prepareSourceData() {
            this.fetchData("", null, this.mapData.bind(this));
        }

        saveData(data) {
            this.arrToDisplay = data;
        }

        createItem(data) {
            let options = this.model.getOptionData("POST", data);
            this.model.fetchData("", options, this.prepareSourceData.bind(this));
        }

        deleteItem(id) {
            let options = this.model.getOptionData("DELETE");
            this.model.fetchData(id, options, this.prepareSourceData.bind(this));
        }

    }

    window.app = window.app || {};
    window.app.Model = Model;

})();