// init references
const newTaskInput = document.querySelector("#new-task input");
const taskDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote;
let count;

// on window load
window.onload() = () => {
	updateNote = "";
	count = Object.keys(localStorage).length;
	displayTasks();
};
