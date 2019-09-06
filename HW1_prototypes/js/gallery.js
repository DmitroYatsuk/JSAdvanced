'use strict';
let BaseGallery = function (locators) {
	this.locators = locators;
	this.counter = 0;
	//this.mappedArr = [];
	this.arrToDisplay = [];
}

BaseGallery.prototype = {

	initComponent: function () {
		this.locators.addBtn.addEventListener("click", this.addBtnHandler.bind(this));
		this.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
		this.locators.filterOne.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterTwo.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterThree.addEventListener("click", this.filterHandler.bind(this));
		this.locators.filterFour.addEventListener("click", this.filterHandler.bind(this));
	},

	shrinkString: function (str) {
		return (str.length >= 15)
			? str.substring(0, 15) + "..."
			: str;
	},

	showResult: function () {
		let resultHTML = "";
		this.arrToDisplay.forEach(function (car) {
			resultHTML += `
							<div class="col-md-4">
								<div class="card mb-4 box-shadow">
								<img class="card-img-top"
									data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="${car.name}"
									src="${car.url}" data-holder-rendered="true"
									style="height: 225px; width: 100%; display: block;">
								<div class="card-body">
									<p class="card-text">${car.description}</p>
									<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<button type="button" class="btn btn-outline-secondary">View</button>
										<button type="button" class="btn btn-outline-secondary">Edit</button>
									</div>
									<a href="#" id="remove-counter" class="btn btn-danger">Удалить</a>
									<small class="text-muted">${car.date}</small>
									</div>
								</div>
								</div>
							</div>`;
		}
		)
		this.locators.result.innerHTML = resultHTML;
		//count.innerHTML = this.counter;
	},

	addElement: function (mappedArr) {
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
	},

	addBtnHandler: function (e) {
		this.addElement(this.prepareSourceData());
	},

	removeElement: function (idxToDel) {
		if (this.counter >= 0) {
			this.arrToDisplay.splice(idxToDel, 1);
			if (this.counter < mappedArr.length - 1) {
				this.locators.addBtn.style.backgroundColor = "white";
			}
			this.counter -= 1;
			this.filterThumbnails(this.getFilterType());
			this.showResult();
		}
	},

	removeBtnHandler: function (e) {
		if (e.target.localName === "button") {
			let target = e.target.parentElement.previousElementSibling;
			let curSrc = target.currentSrc;
			let idx = arrToDisplay.findIndex(item => item.url === curSrc);
			this.removeElement(idx);
			e.stopImmediatePropagation();
		}
	},

	filterThumbnails: function (filterValue) {
		this.setFilterType(filterValue);
		switch (filterValue) {
			case "dropdown-1":
				this.arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "dropdown-2":
				this.arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "dropdown-3":
				this.arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
				break;
			case "dropdown-4":
				this.arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
				break;
		}
	},

	filterHandler: function (e) {
		this.filterThumbnails(e.target.id);
		this.showResult();
	},

	setFilterType: function (filterValue) {
		localStorage.setItem('filter', filterValue);
	},

	getFilterType: function () {
		let filterValue = localStorage.getItem('filter');
		if (filterValue === null) {
			this.setFilterType("dropdown-1");
			return "dropdown-1";
		}
		else return filterValue;
			
	},

	prepareSourceData: function () {
		let copiedData = data.slice();

		let newArr = [];
		copiedData.forEach(item => {
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

		return mappedArr;
	}
}



/* let ExtendedGallery = function () {
	BaseGallery.apply(this);
	this.property = {};
}
ExtendedGallery.prototype = {

	initListeners: function () {
		BaseGallery.prototype.initListeners.apply(this);
	},

	addImage: function () {
		// новый метод которо нет у родителя
	}
}

// код функции наследования можно найти архиве, который содержится
// в материалах к сессии 29 (практический пример)
service.inheritance(BaseGallery, ExtendedGallery); */