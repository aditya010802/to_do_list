document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            addTodoToServer(newTodo);
            todoInput.value = '';
        }
    });

    function addTodoToServer(todo) {
        fetch('add_todo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addTodoToList(data.id, todo);
            } else {
                alert('Failed to add todo');
            }
        });
    }

    function addTodoToList(id, todo) {
        const li = document.createElement('li');
        li.textContent = todo;
        li.dataset.id = id;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodoFromServer(id, li));
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }

    function deleteTodoFromServer(id, li) {
        fetch('delete_todo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                li.remove();
            } else {
                alert('Failed to delete todo');
            }
        });
    }

    function loadTodos() {
        fetch('get_todos.php')
        .then(response => response.json())
        .then(data => {
            data.todos.forEach(todo => {
                addTodoToList(todo.id, todo.todo);
            });
        });
    }

    loadTodos();
});
