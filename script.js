const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerButton = document.querySelector('.header-button');

let todoData;

if (localStorage.todoData) {
    todoData = JSON.parse(localStorage.todoData);
} else {
    todoData = [];
}


function updateToDo() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    todoData.forEach((taskObj, index) => {
        const task = document.createElement('li');

        task.classList.add('todo-item');
        task.innerHTML = `
            <span class="text-todo">${taskObj.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `;

        const btnToDoComplete = task.querySelector('.todo-complete');
        const taskRemoveBtn = task.querySelector('.todo-remove');

        btnToDoComplete.addEventListener('click', (e) => {
            e.preventDefault();
            taskObj.completed ? taskObj.completed = false :
                taskObj.completed = true;
        
            updateToDo();
        });

        taskRemoveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            todoData.splice(index, 1);

            updateToDo();
        });

        if (!taskObj.completed) {
            todoList.appendChild(task);
        } else {
            todoCompleted.appendChild(task);
        }
    });

    localStorage.setItem('todoData', JSON.stringify(todoData));
};

updateToDo();

headerButton.addEventListener('click', (e) => {
    if (headerInput.value) {
        e.preventDefault();
        const newTask = { value: headerInput.value, completed: false };
        todoData.push(newTask);
        headerInput.value = '';
        updateToDo();
    }
});