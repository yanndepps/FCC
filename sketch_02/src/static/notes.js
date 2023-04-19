// init references
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote;
let count;

// on window load
window.onload = () => {
	updateNote = "";
	count = Object.keys(localStorage).length;
	displayTasks();
};

// display tasks
const displayTasks = () => {
	if (Object.keys(localStorage).length > 0) {
		tasksDiv.style.display = "inline-block";
	} else {
		tasksDiv.style.display = "none";
	}

	// clear the tasks
	tasksDiv.innerHTML = "";

	// fetch all keys in LS
	let tasks = Object.keys(localStorage);
	tasks = tasks.sort();

	for (let key of tasks) {
		// get all values
		let value = localStorage.getIem(key);
		let taskInnerDiv = document.createElement("div");
		taskInnerDiv.classList.add("task");
		taskInnerDiv.setAttribute("id", key);
		taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

		// parse string <-> boolean
		let editBtn = document.createElement("button");
		editBtn.classList.add("edit");
		editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
		if (!JSON.parse(value)) {
			editBtn.style.visibility = "visible";
		} else {
			editBtn.style.visibility = "hidden";
			taskInnerDiv.classList.add("completed");
		}
		taskInnerDiv.appendChild(editBtn);
		taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></button>`;
		tasksDiv.appendChild(taskInnerDiv);
	}
};

// disable edit btn
const disableBtn = (bool) => {
	let editBtns = document.getElementsByClassName("edit");
	Array.from(editBtns).forEach((element) => {
		element.disabled = bool;
	});
};