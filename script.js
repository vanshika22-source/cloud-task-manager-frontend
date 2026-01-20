const API_URL = "http://127.0.0.1:5000/tasks";

// Load tasks on page load
window.onload = loadTasks;

// Add new task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";
    loadTasks();
}

// Get all tasks
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerText = task.title;

        li.onclick = () => toggleTask(task.id);

        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.className = "delete-btn";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Mark task complete/incomplete
async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT"
    });
    loadTasks();
}

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    loadTasks();
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}