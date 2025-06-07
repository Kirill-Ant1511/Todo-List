const modalBtns = document.querySelector("*[data-modal-btn]");
let name = modalBtns.getAttribute('data-modal-btn');
let modal = document.querySelector("*[data-modal-window='"+name+"']");
const addBtn = modal.querySelector(".add_button");
const closeBtn = modal.querySelector(".cancel_button");

let tasks = getDataWithoutLocalStorage();
updateTasks()

function getDataWithoutLocalStorage() {
    const arrayData = localStorage.getItem("tasks");
    const result = JSON.parse(arrayData);
    console.log(result ?? [])
    return result ?? [];
}

function saveDataInLocalStorage(item) {
    try {
        const serializationData = JSON.stringify(item)
        localStorage.setItem("tasks", serializationData);
    } catch {
        console.log(error);
    }
}

function completeTask(index) {
    tasks[index].isCompleted = tasks[index].isCompleted ? false : true;
    updateTasks()
}

function deleteTask(index) {
    tasks = tasks.filter((task) => task.id !== tasks[index].id);
    updateTasks();
}

function updateTasks() {
    let taskCard = document.querySelector(".task_cards");
    taskCard.innerHTML = '';
    if (tasks.length == 0) {
        const noTasks = `
            <div class="no_tasks">
                <h1>Пока что нету задач</h1>
            </div>
        `
        taskCard.insertAdjacentHTML('beforeend', noTasks);
    } 
    tasks.forEach((element, index, array) =>  {
        const task = `
        <li class="card">
            
            <h3>${element.title}</h3>
            <div class="button_section">
                <button class="compleate_button ${index}"><img src="Resource/check-3277.svg"></button>
                <button class="delete_button"><img src="Resource/trash-can-10413.svg" alt=""></button>
            </div>
        </li>
        `;
        
        taskCard.insertAdjacentHTML('beforeend', task);
        if (element.isCompleted) {
            taskCard.querySelectorAll("h3")[index].style.textDecoration = "line-through";
            taskCard.querySelectorAll(".card")[index].style.backgroundColor = "#00DD67"
        }   
    })
    const compleatedBtns = document.querySelectorAll(".compleate_button");
    for (let i = 0; i < compleatedBtns.length; i++) {
        compleatedBtns[i].removeEventListener('click', () => {
            completeTask(i);
        })
        compleatedBtns[i].addEventListener('click', () => {
            completeTask(i);
        })
    }
    const deleteBtns = document.querySelectorAll(".delete_button");
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].removeEventListener('click', () => {
            deleteTask(i);
        })
        deleteBtns[i].addEventListener('click', () => {
            deleteTask(i);
        })
    }

    saveDataInLocalStorage(tasks);
}

function addElement(title, description, index) {
    let id = tasks.at(-1) ? tasks.at(-1).id + 1 : 0;
    let task = {
        id: id,
        title: title,
        descriptio: description,
        isCompleted: false
    }
    tasks.push(task);
}

modalBtns.addEventListener('click', () => {
    modal.style.display = "block";
})


addBtn.addEventListener('click', () => {
    let inputs = modal.querySelectorAll('input');
    let title = inputs[0].value;
    let description = inputs[1].value;
    addElement(title, description);
    inputs[0].value = "";
    inputs[1].value = "";
    updateTasks();
    modal.style.display = "none";
})

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
})