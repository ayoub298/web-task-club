window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Charger les tâches depuis localStorage au chargement de la page
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        list_el.innerHTML = ''; // Vider la liste avant de la remplir
        tasks.forEach((task, index) => {
            const task_el = createTaskElement(task, index);
            list_el.appendChild(task_el);
        });
    }

    function createTaskElement(task, index) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_done_el = document.createElement('button');
        task_done_el.classList.add('done');
        task_done_el.innerText = 'Done';

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_done_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        // Action du bouton Done
        task_done_el.addEventListener('click', () => {
            task_input_el.classList.toggle('done-text');
        });

        // Action du bouton Edit
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                tasks[index] = task_input_el.value; // Mettre à jour la tâche dans le tableau
                saveTasks();
            }
        });

        // Action du bouton Delete
        task_delete_el.addEventListener('click', () => {
            tasks.splice(index, 1); // Supprimer la tâche du tableau
            saveTasks();
            renderTasks();
        });

        return task_el;
    }

    // Afficher les tâches au chargement de la page
    renderTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (task === "") return; // Empêche d'ajouter une tâche vide

        tasks.push(task); // Ajouter la nouvelle tâche au tableau
        saveTasks();
        renderTasks();

        input.value = '';
    });
});