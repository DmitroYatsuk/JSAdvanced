'use strict';
class Service {

	showPage(pageName, pages) {
		pages.forEach(element => {
			if (element.id === pageName) {
				element.classList.remove("hide");
				element.classList.add("show");
			}
			else {
				element.classList.remove("show");
				element.classList.add("hide");
			}
		});
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
		fetch(`http://localhost:3000/user`)
			.then(response => response.json())
			.then(data => {
				return data;
			});
	}

}
