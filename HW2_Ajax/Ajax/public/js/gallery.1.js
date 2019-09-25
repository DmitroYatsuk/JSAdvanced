/* 
*  Схематическое изображение класса Галереи
*/

class BaseGallery {
	constructor() {
		this.list = [];
		this.initComponent();
		setTimeout(() => {
		console.log("list: ");
		console.table(this.list); 
		}, 5000);	
	}

	initComponent() {
		fetch("http://localhost:3000/cars").then(response => response.json())
			.then(data => {
				//console.log("data: ");
				//console.table(data);
				this.saveData(data);
				//return data;
			})
			.then(() => {
				//console.log("list: ");
				//console.table(this.list);
			})
	}

	saveData(data) {
		this.list = data;
	}

	updateItem() {
		fetch("http://localhost:3000/cars/5", options).then(response => response.json())
			.then(data => {
				this.initComponent();
			})
	}
}