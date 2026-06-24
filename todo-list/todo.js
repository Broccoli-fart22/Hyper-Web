
document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    saveTasks();
    
    taskInput.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTask(span));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteTask(li));

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function editTask(taskSpan) {
    const newText = prompt("Edit your task:", taskSpan.textContent);
    if (newText !== null && newText.trim() !== "") {
        taskSpan.textContent = newText.trim();
        saveTasks();
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-text").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
}
