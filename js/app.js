const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-msg");
const counter = document.getElementById("counter");

const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterDone = document.getElementById("filter-done");

// Add a new task
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const task = input.value.trim();

    if (task === "") {
        errorMsg.classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";

    updateCounter();
});

// Event delegation: toggle complete or delete
list.addEventListener("click", function(e) {

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }
    else if (e.target.classList.contains("item-text")) {
        e.target.parentElement.classList.toggle("completed");
    }

    updateCounter();
});

// Update remaining tasks counter
function updateCounter() {
    const tasks = list.querySelectorAll("li");
    const activeTasks = list.querySelectorAll("li:not(.completed)");

    counter.textContent = activeTasks.length + " items left";
}

// Show all tasks
filterAll.addEventListener("click", function() {
    const tasks = list.querySelectorAll("li");

    tasks.forEach(function(task) {
        task.style.display = "flex";
    });
});

// Show active tasks
filterActive.addEventListener("click", function() {
    const tasks = list.querySelectorAll("li");

    tasks.forEach(function(task) {
        if (task.classList.contains("completed")) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
});

// Show completed tasks
filterDone.addEventListener("click", function() {
    const tasks = list.querySelectorAll("li");

    tasks.forEach(function(task) {
        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});