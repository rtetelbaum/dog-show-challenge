document.addEventListener('DOMContentLoaded', () => {

	// DOM ELEMENTS

	const dogTable = document.querySelector("#table-body")
	const dogForm = document.querySelector("#dog-form")

	// EVENT HANDLERS

	dogTable.addEventListener("click", event => {
		if (event.target.matches("button")) {
			currentRow = event.target.closest("tr")
			dogForm.dataset.id = event.target.dataset.id
			dogForm.name.value = currentRow.cells[0].textContent
			dogForm.sex.value = currentRow.cells[1].textContent
			dogForm.breed.value = currentRow.cells[2].textContent
		}
	})

	dogForm.addEventListener("submit", event => {
		event.preventDefault()
		const patchID = event.target.closest("form").dataset.id
		const patchData = {
			name: dogForm.name.value,
			breed: dogForm.sex.value,
			sex: dogForm.breed.value
		}
		fetchPatchDog(patchID, patchData)
		event.target.reset()
	})

	// FETCHERS

	function fetchGetAllDogs() {
		fetch('http://localhost:3000/dogs')
			.then(response => response.json())
			.then(dogObjs => {
				console.log(dogObjs)
				renderAllDogs(dogObjs)
			})
	}

	function fetchPatchDog(patchID, patchData) {
		fetch(`http://localhost:3000/dogs/${patchID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(patchData),
		})
		.then(response => response.json())
		.then(newDog => {
			console.log('Success:', newDog);
			renderNewDog(newDog)
		})
	}

	// RENDERERS

	function renderAllDogs(dogObjs) {
		dogObjs.forEach( dog => {
		const dogRow = document.createElement("tr")
		dogRow.dataset.id = dog.id
		dogRow.innerHTML = `
			<td>${dog.name}</td>
			<td>${dog.breed}</td>
			<td>${dog.sex}</td>
			<td><button data-id=${dog.id}>Edit Dog</button></td>
		`
		dogTable.append(dogRow)
		})
	}

	function renderNewDog(newDog) {
		const dogRow = document.querySelector(`tr[data-id="${newDog.id}"]`)
		dogRow.innerHTML = `
			<td>${newDog.name}</td>
			<td>${newDog.breed}</td>
			<td>${newDog.sex}</td>
			<td><button data-id=${newDog.id}>Edit Dog</button></td>
		`
	}

	// INITIALIZER

	fetchGetAllDogs()

})