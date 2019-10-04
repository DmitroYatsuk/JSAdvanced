'use strict';
class listService {
	constructor() {

	}

	shrinkString(str) {
		return (str.length >= 15)
			? str.substring(0, 15) + "..."
			: str;
	}

	editFormTemplate(item) {
		return `<main class="text-center" role="main">
		<form id="form-update" class="form-update">
		  <h1 class="h3 mb-3 font-weight-normal">update form</h1>
		  <label for="url" class="sr-only">URL</label>
		  <input type="text" id="url" class="form-control" placeholder="url" required="" autofocus="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="name" class="sr-only">Name</label>
		  <input type="text" id="name" class="form-control" placeholder="name" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="id" class="sr-only">Id</label>
		  <input type="text" id="id" class="form-control" placeholder="name" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="description" class="sr-only">Description</label>
		  <input type="text" id="description" class="form-control" placeholder="description" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="date" class="sr-only">Date</label>
		  <input type="date" id="date" class="form-control" placeholder="date" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <button id="btn-update" class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
		  <p class="mt-5 mb-3 text-muted">© 2019</p>
		</form>`;
	}

	createFormTemplate() {
		return `<main class="text-center" role="main">
		<form id="form-create" class="form-create">
		  <h1 class="h3 mb-3 font-weight-normal">Create form</h1>
		  <label for="url" class="sr-only">URL</label>
		  <input type="text" id="url" class="form-control" placeholder="url" required="" autofocus="" autocomplete="off" value="http://desktopwallpapers.org.ua/pic/201510/320x240/desktopwallpapers.org.ua-41430.jpg">
		  <div class="mb-3"></div>
		  <label for="name" class="sr-only">Name</label>
		  <input type="text" id="name" class="form-control" placeholder="name" required="" autocomplete="off" value="VW Tractor">
		  <div class="mb-3"></div>
		  <label for="id" class="sr-only">Id</label>
		  <input type="text" id="id" class="form-control" placeholder="name" required="" autocomplete="off" value="11">
		  <div class="mb-3"></div>
		  <label for="description" class="sr-only">Description</label>
		  <input type="text" id="description" class="form-control" placeholder="description" required="" autocomplete="off" value="Lorem ipsum dolor sit amet">
		  <div class="mb-3"></div>
		  <label for="date" class="sr-only">Date</label>
		  <input type="number" id="date" class="form-control" placeholder="date" required="" autocomplete="off" value="1322159200000">
		  <div class="mb-3"></div>
		  <button id="btn-create" class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
		  <p class="mt-5 mb-3 text-muted">© 2019</p>
		</form>`;
	}
}
