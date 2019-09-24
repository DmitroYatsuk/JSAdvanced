/* 
*  Схематическое изображение класса Галереи
*/

class BaseGallery {
	constructor() {
		this.list = [];
	}

	 initComponent (){
		fetch("http://localhost:3000/cars").then(responce => responce.json())
            .then(data => {
				console.log(data);
				this.saveData(data);
                //return data;
            })   
	}
	saveData (data) {
		this.list = data;
	}

	updateItem () {
		fetch("http://localhost:3000/cars/5", options).then(responce => responce.json())
            .then(data => {
				this.initComponent();
            })

	}
}

this.initComponent();
	
console.log(list);