const taskInput = document.querySelector(".task-input .row input");
const taskButton = document.querySelector(".task-input .row button");
filters = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn");
taskBox = document.querySelector(".task-box");
let editId;
let isEditedTask = false;

//Getting local storage to-do list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            //if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "Completed" ? "checked" : "";
            // console.log(id, todo);
            if(filter == todo.status || filter == "all") {
                li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`
            }
        });
    }
    // if li isn't empty, insert this value insode taskbox else insert span
    taskBox.innerHTML = li || `<span>You don't have any tasks here</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    // console.log(selectedTask);
    // Getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e=> {
        // Removing show class from the task menu on the document click
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    // console.log(taskId, taskName);
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    // console.log(deleteId);
    // Removing selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    // removing all items of array/tools
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
})

function updateStatus(selectedTask) {
    // console.log(selectedTask)
    //Getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        //Update the status of the selected task to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //Update the status of the selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        // console.log(userTask)
        if(!isEditedTask) { // if isEditedTask isn't true
            if(!todos) { // if tools isn't exist, pass an empty array to todos
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo); // adding new task to todos
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});

taskButton.addEventListener("click", e => {
    let userTask = taskInput.value.trim();
    if(userTask) {
        // console.log(userTask)
        if(!isEditedTask) { // if isEditedTask isn't true
            if(!todos) { // if tools isn't exist, pass an empty array to todos
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo); // adding new task to todos
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});