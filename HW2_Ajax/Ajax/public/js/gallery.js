'use strict';
class BaseGallery {
	constructor(locators) {
		this.locators = locators;
		this.counter = 0;
		this.arrToDisplay = [];
		//		this.list = [];
		this.body = {};
		this.url = document.getElementById("url");
		this.name = document.getElementById("name");
		this.id = document.getElementById("id");
		this.description = document.getElementById("description");
		this.date = document.getElementById("date");
		//this.output = document.getElementById("output");
	}

	initComponent() {
		this.prepareSourceData();
		this.initListeners();
	}

	initListeners() {
		this.locators.addBtn.addEventListener("click", this.addBtnHandler.bind(this));
		this.locators.filterOne.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterTwo.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterThree.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterFour.addEventListener("click", this.filterHandler.bind(this));
		this.locators.createBtn.addEventListener("click", this.createBtnHandler.bind(this));
		this.locators.editBtn.addEventListener("click", this.editBtnHandler.bind(this));
	}

	shrinkString(str) {
		return (str.length >= 15)
			? str.substring(0, 15) + "..."
			: str;
	}

	renderWholeGallery(mappedArr) {
		//		if (this.counter < mappedArr.length) {
		//			this.arrToDisplay.push(mappedArr[this.counter]);
		//			if (this.counter === mappedArr.length - 1) {
		//				this.locators.addBtn.style.backgroundColor = "grey";
		//			}
		//			this.counter += 1;
		//		this.arrToDisplay = mappedArr;
		//		this.filterThumbnails(this.getFilterType());
		this.showResult();
		//		}
		//		else $("#myModal").modal();
	}

	showResult() {
		let resultHTML = "";
		this.arrToDisplay.forEach(function (car, idx) {
			resultHTML += `
							<div class="col-md-4">
								<div class="card mb-4 box-shadow">
								<img class="card-img-top"
									data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="${car.name}"
									src="${car.url}" data-holder-rendered="true"
									style="height: 225px; width: 100%; display: block;">
								<div class="card-body">
									<p class="card-text">${car.name}</p>
									<p class="card-text">${car.description}</p>
									<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<button type="button" class="btn btn-outline-secondary" data-view-btn="${idx}">View</button>
										<button type="button" class="btn btn-outline-secondary" data-edit-btn="${idx}">Edit</button>
									</div>
									<a href="#" class="btn btn-danger" data-rm-btn="${idx}">Удалить</a>
									<small class="text-muted">${car.date}</small>
									</div>
								</div>
								</div>
							</div>`;
		}
		)
		this.locators.result.innerHTML = resultHTML;
	}

	addElement(mappedArr) {
		if (this.counter < mappedArr.length) {
			this.arrToDisplay.push(mappedArr[this.counter]);
			if (this.counter === mappedArr.length - 1) {
				this.locators.addBtn.style.backgroundColor = "grey";
			}
			this.counter += 1;
			this.filterThumbnails(this.getFilterType());
			this.showResult();
		}
		else $("#myModal").modal();
	}

	addBtnHandler(e) {
		//this.addElement(this.list);
		loginForm.hideElement(galleryLocators.galleryView);
		loginForm.hideElement(galleryLocators.editBtn);
		loginForm.showElement(galleryLocators.createForm);		
	}

	filterThumbnails(filterValue) {
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

	filterHandler(e) {
		this.filterThumbnails(e.target.id);
		this.showResult();
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

	prepareSourceData() {
		fetch("http://localhost:3000/cars")
			.then(response => {
				return response.json();
			})
			.then(data => {
				let newArr = [];
				data.forEach(item => {
					newArr.push({
						url: item.url,
						name: item.name,
						description: item.description,
						date: item.date,
					})
				})

				let mappedArr = newArr.map(item => {
					return {
						url: `http://${item.url}`,
						name: item.name.charAt(0).toLocaleUpperCase() + `${item.name}`.slice(1).toLowerCase(),
						description: this.shrinkString(item.description),
						date: moment(item.date).format("YYYY/MM/DD HH:mm"),
					}
				})
				this.saveData(mappedArr);
				this.renderWholeGallery();
			})
	}

	saveData(data) {
		this.arrToDisplay = data;
	}

	updateItem(data) {
		let options = {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		fetch(`http://localhost:3000/cars`, options)
			.then(response => response.json())
			.then(data => {
				this.prepareSourceData();
			})
	}

	createBtnHandler() {
		let body = {
			url: this.url.value,
			name: this.name.value,
			id: this.id.value,
			description: this.description.value,
			date: this.date.value
		}
		this.updateItem(body);
		loginForm.hideElement(galleryLocators.createForm);
		loginForm.showElement(galleryLocators.galleryView);
	}

}

//--------------Inheritance------------------------------------

class ExtendedGallery extends BaseGallery {
	constructor(locators) {
		super(locators);
		this.locators = locators;
		this.property = {};
	}

	initListeners() {
		super.initListeners();
		this.locators.result.addEventListener("click", this.viewBtnHandler.bind(this));
		this.locators.result.addEventListener("click", this.editBtnHandler.bind(this));
		this.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
	}

	viewBtnHandler(e) {
		if (!e.target.attributes["data-view-btn"]) {
			return;
		}
		e.target.attributes["data-view-btn"].nodeValue;
		loginForm.hideElement(galleryLocators.galleryView);
		loginForm.showElement(galleryLocators.editForm);
	}

	editBtnHandler(e) {
		if (!e.target.attributes["data-edit-btn"]) {
			return;
		}
		e.target.attributes["data-edit-btn"].nodeValue;
		loginForm.hideElement(galleryLocators.galleryView);
		loginForm.showElement(galleryLocators.editForm);
	}

	removeElement(mappedArr, idx) {
		if (this.counter >= 0) {
			this.arrToDisplay.splice(idx, 1);
			if (this.counter <= mappedArr.length) {
				this.locators.addBtn.style.backgroundColor = "";
			}
			this.counter -= 1;
			this.filterThumbnails(this.getFilterType());
			this.showResult();
		}
	}

	removeBtnHandler(e) {
		this.removeElement(this.arrToDisplay, e.target.attributes["data-rm-btn"].nodeValue);
	}
}

