(function () {

    class Model {
        constructor(url) {
            this.url = url;
            this.arrToDisplay = [];
        }

        shrinkString(str) {
            return (str.length >= 15)
                ? str.substring(0, 15) + "..."
                : str;
        }

        getRawData(id) {
            this.fetchData(id, null)
            .then(data => this.setInputValues(data));
        }
        
        prepareSourceData() {
            return this.fetchData("", null)
                .then(data => {
                    this.mapData(data);
                });
        }

        fetchData(id, options) {
            return fetch(`http://localhost:3000/cars/${id}`, options)
                .then(response => response.json());
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
                    description: this.shrinkString(item.description),
                    date: moment(item.date).format("YYYY/MM/DD HH:mm"),
                }
            })
            this.saveArrData(mappedArr);
        }

        updateItem(data) {
            let options = this.model.getOptionData("PUT", data);
            this.model.fetchData(data.id, options, this.prepareSourceData.bind(this));
        }

        saveArrData(data) {
            this.arrToDisplay = data;
        }

        getArrData() {
            return this.arrToDisplay
        }

        createItem(data) {
            let options = this.model.getOptionData("POST", data);
            this.model.fetchData("", options, this.prepareSourceData.bind(this));
        }

        deleteItem(id) {
            let options = this.model.getOptionData("DELETE");
            this.model.fetchData(id, options, this.prepareSourceData.bind(this));
        }

        setFilterType(filterValue) {
            localStorage.setItem('filter', filterValue);
        }

        getFilterType() {
            let filterValue = localStorage.getItem('filter');
            if (filterValue === null) {
                this.setFilterType("dropdown-1");
                return "dropdown-1";
            }
            else return filterValue;

        }

        filterCards(filterValue) {
            this.setFilterType(filterValue);
            switch (filterValue) {
                case "dropdown-1":
                    this.arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
                    return;
                case "dropdown-2":
                    this.arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
                    return;
                case "dropdown-3":
                    this.arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
                    return;
                case "dropdown-4":
                    this.arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
                    return;
            }
        }
    }

    window.app = window.app || {};
    window.app.Model = Model;

})();