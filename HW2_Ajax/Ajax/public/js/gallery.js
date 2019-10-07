'use strict';
class BaseGallery {
	constructor(locators) {
		this.locators = locators;
		this.arrToDisplay = [];

		this.formHeader = document.getElementById("form-header");
		this.url = document.getElementById("url");
		this.name = document.getElementById("name");
		this.id = document.getElementById("id");
		this.description = document.getElementById("description");
		this.date = document.getElementById("date");
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
		this.locators.updateBtn.addEventListener("click", this.updateBtnHandler.bind(this));
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
										<button type="button" class="btn btn-outline-secondary" data-view-btn="${car.id}">View</button>
										<button type="button" class="btn btn-outline-secondary" data-edit-btn="${car.id}">Edit</button>
									</div>
									<a href="#" class="btn btn-danger" data-rm-btn="${car.id}">Удалить</a>
									<small class="text-muted">${car.date}</small>
									</div>
								</div>
								</div>
							</div>`;
		}
		)
		this.locators.result.innerHTML = resultHTML;
	}

	addBtnHandler(e) {
		loginForm.hideElement(galleryLocators.galleryView);
		loginForm.hideElement(galleryLocators.updateBtn);
		loginForm.showElement(galleryLocators.createForm);
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

	filterHandler(e) {
		this.filterCards(e.target.id);
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
				description: service.shrinkString(item.description),
				date: moment(item.date).format("YYYY/MM/DD HH:mm"),
			}
		})
		this.saveData(mappedArr);
		this.filterCards(this.getFilterType());
		this.showResult();
	}

	prepareSourceData() {
		service.fetchData("", null, this.mapData.bind(this));
	}

	saveData(data) {
		this.arrToDisplay = data;
	}

	createItem(data) {
		let options = service.getOptionData("POST", data);
		service.fetchData("", options, this.prepareSourceData.bind(this));
	}

	createBtnHandler(e) {
		this.createItem(this.getInputValues());
		loginForm.hideElement(galleryLocators.createForm);
		loginForm.showElement(galleryLocators.galleryView);
	}

	setInputValues(data) {
		this.url.value = data.url;
		this.name.value = data.name;
		this.id.value = data.id;
		this.description.value = data.description;
		this.date.value = data.date;
	}

	getInputValues() {
		return {
			url: this.url.value,
			name: this.name.value,
			id: this.id.value,
			description: this.description.value,
			date: +this.date.value
		}
	}

	getRawData(id) {
		service.fetchData(id, null, this.setInputValues.bind(this));
	}

	updateItem(data) {
		let options = service.getOptionData("PUT", data);
		service.fetchData(data.id, options, this.prepareSourceData.bind(this));
	}

	updateBtnHandler(e) {
		this.updateItem(this.getInputValues());
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
		this.locators.result.addEventListener("click", this.viewFormBtnHandler.bind(this));
		this.locators.result.addEventListener("click", this.editFormBtnHandler.bind(this));
		this.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
	}

	viewFormBtnHandler(e) {
		if (!e.target.attributes["data-view-btn"]) {
			return;
		}
		e.target.attributes["data-view-btn"].nodeValue;

	}

	editFormBtnHandler(e) {
		if (!e.target.attributes["data-edit-btn"]) {
			return;
		}
		loginForm.hideElement(galleryLocators.galleryView);
		this.formHeader.innerHTML = "Edit element form";
		this.getRawData(e.target.attributes["data-edit-btn"].nodeValue);
		loginForm.showElement(galleryLocators.updateBtn);
		loginForm.hideElement(galleryLocators.createBtn);
		loginForm.showElement(galleryLocators.createForm);
	}

	deleteItem(id) {
		let options = service.getOptionData("DELETE");
		service.fetchData(id, options, this.prepareSourceData.bind(this));
	}

	removeBtnHandler(e) {
		if (!e.target.attributes["data-rm-btn"]) {
			return;
		}
		this.deleteItem(e.target.attributes["data-rm-btn"].nodeValue);
	}
}

