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
        
        prepareSourceData() {
            return this.fetchData("", null)
                .then(data => {
                    return this.mapData(data);
                });
        }

        fetchData(id, options = null) {
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
            return this.filterCards(mappedArr);
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

        filterCards(arrToDisplay) {
            let filterValue = this.getFilterType();
            this.setFilterType(filterValue);
            switch (filterValue) {
                case "dropdown-1":
                    return arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
                case "dropdown-2":
                    return arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
                case "dropdown-3":
                    return arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
                case "dropdown-4":
                    return arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
            }
        }
        
        createItem(data) {
            let options = this.getOptionData("POST", data);
            return this.fetchData("", options)
            .then(() => this.prepareSourceData());
        }

        deleteItem(id) {
            let options = this.getOptionData("DELETE");
            return this.fetchData(id, options)
            .then(() => this.prepareSourceData());
        }

        updateItem(data) {
            let options = this.getOptionData("PUT", data);
            return this.fetchData(data.id, options)
            .then(() => this.prepareSourceData());
        }


    }

    window.app = window.app || {};
    window.app.Model = Model;

})();