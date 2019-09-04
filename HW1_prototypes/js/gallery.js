'use strict';
let BaseGallery = function (locators) {
	this.locators = locators;
	this.counter = 0;
}

BaseGallery.prototype = {
	initComponent: function () {
		this.locators.addBtn.addEventListener("click", this.addBtnHandler);
		this.locators.result.addEventListener("click", this.removeBtnHandler);
		this.locators.filter.addEventListener("change", this.filterHandler);
	},

	shrinkString: function (str) {
		return (str.length >= 15)
			? str.substring(0, 15) + "..."
			: str;
	},

	showResult: function () {
		let resultHTML = "";
		arrToDisplay.forEach(function (car) {
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
								  <a href="#" class="btn btn-danger">Удалить</a>
								  <small class="text-muted">${car.date}</small>
								</div>
							  </div>
							</div>
						  </div>`;
		}
		)
		result.innerHTML = resultHTML;
		count.innerHTML = this.counter;
	},

	addElement: function (mappedArr) {
		if (this.counter < mappedArr.length) {
			arrToDisplay.push(mappedArr[counter]);
			if (counter === mappedArr.length - 1) {
				addBtn.style.backgroundColor = "grey";
			}
			counter += 1;
			filterThumbnails();
			showResult();
		}
		else $("#myModal").modal();
	},

	addBtnHandler: function (event) {
		addElement(mappedArr);
	},

	removeElement: function (idxToDel) {
		if (counter >= 0) {
			arrToDisplay.splice(idxToDel, 1);
			if (counter < mappedArr.length - 1) {
				addBtn.style.backgroundColor = "white";
			}
			counter -= 1;
			filterThumbnails();
			showResult();
		}
	},

	removeBtnHandler: function (event) {
		if (event.target.localName === "button") {
			let target = event.target.parentElement.previousElementSibling;
			let curSrc = target.currentSrc;
			let idx = arrToDisplay.findIndex(item => item.url === curSrc);
			removeElement(idx);
			event.stopImmediatePropagation();
		}
	},

	filterThumbnails: function () {
		let presetFilter = filter.value;
		localStorage.setItem('filter', presetFilter);
		switch (presetFilter) {
			case "1":
				arrToDisplay.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "2":
				arrToDisplay.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "3":
				arrToDisplay.sort((a, b) => b.date.localeCompare(a.date));
				break;
			case "4":
				arrToDisplay.sort((a, b) => a.date.localeCompare(b.date));
				break;
		}
	},

	filterHandler: function (event) {
		filterThumbnails();
		showResult();
	},

	presetFilterType: function () {
		filter.value = localStorage.getItem('filter');
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
				description: shrinkString(item.description),
				date: moment(item.date).format("YYYY/MM/DD HH:mm"),
			}
		})
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