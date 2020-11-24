document.addEventListener('DOMContentLoaded', () => {

	// DOM ELEMENTS

	const dogTable = document.querySelector("#table-body")
	const dogForm = document.querySelector("#dog-form")

	// LISTENERS

	dogTable.addEventListener("click", event => {
		dogBtnClicked(event)
	})

	dogForm.addEventListener("submit", event => {
		event.preventDefault()
		fetchPatchDog(event)
		event.target.reset()
	})

	// HANDLERS

	function fetchGetAllDogs() {
		fetch('http://localhost:3000/dogs')
			.then(response => response.json())
			.then(dogObjs => {
				console.log(dogObjs)
				renderAllDogs(dogObjs)
			})
	}

	function dogBtnClicked(event) {
		currentRow = event.target.closest("tr")
		dogForm.dataset.id = event.target.dataset.id
		dogForm.name.value = currentRow.cells[0].textContent
		dogForm.sex.value = currentRow.cells[1].textContent
		dogForm.breed.value = currentRow.cells[2].textContent
	}

	function fetchPatchDog(event) {
		
		const patchURL = event.target.closest("form").dataset.id
		fetch(`http://localhost:3000/dogs/${patchURL}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(newDog => {
			console.log('Success:', newDog);
			renderNewDog
		})
	}

	// RENDERERS

	function renderAllDogs(dogObjs) {
		dogObjs.forEach( dog => {
		const dogRow = document.createElement("tr")
		dogRow.innerHTML = `
			<td>${dog.name}</td>
			<td>${dog.breed}</td>
			<td>${dog.sex}</td>
			<td><button data-id=${dog.id}>Edit</button></td>
		`
		dogTable.append(dogRow)
		})
	}

	// INITIALIZER

	fetchGetAllDogs()

})