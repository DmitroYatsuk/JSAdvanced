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
		//this.locators.result.addEventListener("click", this.removeBtnHandler.bind(this));
		//this.locators.filter.addEventListener("change", this.filterHandler).bind(this);
	},

	shrinkString: function (str) {
		return (str.length >= 15)
			? str.substring(0, 15) + "..."
			: str;
	},

	showGalleryView: function () {
		this.locators.galleryView.innerHTML = `
												<section class="jumbotron text-center">
												<div class="container">
												<h1 class="jumbotron-heading">Автомобильная галлерея</h1>
												<p class="lead text-muted">На этой странице вы можете увидеть отличную галлерею, которая дает вам возможность
													ознакомится с нашим каталогом транспортных средств. </p>
												<div class="row">
													<div class="col-md-6">
										
													<div class="btn-group" id="dropdown-name">
														<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
														aria-expanded="false">
														Фильтровать по имени
														</button>
														<div class="dropdown-menu">
														<a class="dropdown-item" href="#">Вперед: от А до Я</a>
														<a class="dropdown-item" href="#">Назад: от Я до А</a>
														</div>
													</div>
													</div>
										
													<div class="col-md-5">
													<div class="btn-group" id="dropdown-date">
														<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
														aria-haspopup="true" aria-expanded="false">
														Фильтровать по дате
														</button>
														<div class="dropdown-menu">
														<a class="dropdown-item" date-type="new" href="#">Сначала новые</a>
														<a class="dropdown-item" date-type="old" href="#">Сначала старые</a>
														</div>
													</div>
													</div>
										
										
												</div>
										
												</div>
												</section>
											
												<div></div>
											
												<div class="album py-5 bg-light">
														<div class="container">
														<div id="gallery" class="row">
														</div>
														<div class="text-center">
															<a href="#" id="add" class="btn btn-primary my-2">Добавить картинку</a>
														</div>
													</div>
												</div>`;
	},

	hideGalleryView: function () {
		this.locators.galleryView.innerHTML = "";
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
									<a href="#" id="remove-${this.counter}" class="btn btn-danger">Удалить</a>
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
			this.filterThumbnails();
			this.showResult();
		}
		else $("#myModal").modal();
	},

	addBtnHandler: function (event) {
		this.addElement(mappedArr);
	},

	removeElement: function (idxToDel) {
		if (this.counter >= 0) {
			this.arrToDisplay.splice(idxToDel, 1);
			if (this.counter < mappedArr.length - 1) {
				this.locators.addBtn.style.backgroundColor = "white";
			}
			this.counter -= 1;
			this.filterThumbnails();
			this.showResult();
		}
	},

	removeBtnHandler: function (event) {
		if (event.target.localName === "button") {
			let target = event.target.parentElement.previousElementSibling;
			let curSrc = target.currentSrc;
			let idx = arrToDisplay.findIndex(item => item.url === curSrc);
			this.removeElement(idx);
			event.stopImmediatePropagation();
		}
	},

	filterThumbnails: function () {
		let presetFilter = this.locators.filter.value;
		localStorage.setItem('filter', presetFilter);
		switch (presetFilter) {
			case "1":
				this.arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "2":
				this.arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "3":
				this.arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
				break;
			case "4":
				this.arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
				break;
		}
	},

	filterHandler: function (event) {
		this.filterThumbnails();
		this.showResult();
	},

	presetFilterType: function () {
		this.locators.filter.value = localStorage.getItem('filter');
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