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

	// fetch all keys in lS
	let tasks = Object.keys(localStorage);
	tasks = tasks.sort();

	for (let key of tasks) {
		// get all values
		let value = localStorage.getItem(key);
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

	// tasks completed
	tasks = document.querySelectorAll(".task");
	tasks.forEach((element) => {
		element.onclick = () => {
			// lS update
			if (element.classList.contains("completed")) {
				updateStorage(element.id.split("_")[0], element.innerText, false);
			} else {
				updateStorage(element.id.split("_")[0], element.innerText, true);
			}
		};
	});

	// edit tasks
	editTasks = document.getElementsByClassName("edit");
	Array.from(editTasks).forEach((element) => {
		element.addEventListener("click", (e) => {
			// stop propagation to outer elements when removed
			e.stopPropagation();
			// disable other btns when one task is edited
			disableBtn(true);
			// upd input value & rm div
			let parent = element.parentElement;
			newTaskInput.value = parent.querySelector("#taskname").innerText;
			// set updateNote to the task being edited
			updateNote = parent.id;
			// rm task
			parent.remove();
		});
	});
};

// disable edit btn
const disableBtn = (bool) => {
	let editBtns = document.getElementsByClassName("edit");
	Array.from(editBtns).forEach((element) => {
		element.disabled = bool;
	});
};

// rm tasks from lS
const rmTask = (taskValue) => {
	localStorage.removeItem(taskValue);
	displayTasks();
};

// add tasks to lS
const updateStorage = (index, taskValue, completed) => {
	localStorage.setItem(`${index}_${taskValue}`, completed);
	displayTasks();
};

// add new task
document.querySelector("#push").addEventListener("click", () => {
	// enable edit btn
	disableBtn(false);
	if (newTaskInput.value.length == 0) {
		alert("please enter a task!");
	} else {
		// store & display from lS
		if (updateNote == "") {
			// new task
			updateStorage(count, newTaskInput.value, false);
		} else {
			// update task
			let existingCount = updateNote.split("_")[0];
			rmTask(updateNote);
			updateStorage(existingCount, newTaskInput.value, false);
			updateNote = "";
		}
		count += 1;
		newTaskInput.value = "";
	}
});
