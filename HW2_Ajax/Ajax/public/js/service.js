'use strict';
class listService {
	constructor(){

	}

	editFormTemplate(item) {
		return `<main class="text-center" role="main">
		<form id="form-edit" class="form-edit">
		  <h1 class="h3 mb-3 font-weight-normal">Edit form</h1>
		  <label for="url" class="sr-only">URL</label>
		  <input type="text" id="url" class="form-control" placeholder="url" required="" autofocus="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="name" class="sr-only">Name</label>
		  <input type="text" id="name" class="form-control" placeholder="name" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="description" class="sr-only">Description</label>
		  <input type="text" id="description" class="form-control" placeholder="description" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="date" class="sr-only">Date</label>
		  <input type="text" id="date" class="form-control" placeholder="date" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
		  <p class="mt-5 mb-3 text-muted">© 2019</p>
		</form>
	  </main>`;
	}

	createFormTemplate() {
		return `<main class="text-center" role="main">
		<form id="form-create" class="form-create">
		  <h1 class="h3 mb-3 font-weight-normal">Edit form</h1>
		  <label for="url" class="sr-only">URL</label>
		  <input type="text" id="url" class="form-control" placeholder="url" required="" autofocus="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="name" class="sr-only">Name</label>
		  <input type="text" id="name" class="form-control" placeholder="name" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="description" class="sr-only">Description</label>
		  <input type="text" id="description" class="form-control" placeholder="description" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <label for="date" class="sr-only">Date</label>
		  <input type="text" id="date" class="form-control" placeholder="date" required="" autocomplete="off">
		  <div class="mb-3"></div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
		  <p class="mt-5 mb-3 text-muted">© 2019</p>
		</form>
	  </main>`;
	}
}
