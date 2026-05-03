let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Save to localStorage */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Render Tasks */
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.assigned}</td>
      <td>${task.deadline}</td>
      <td class="${task.status.replace(" ", "")}">${task.status}</td>
      <td>
        <button class="action-btn update-btn" onclick="updateStatus(${index})">Update</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

/* Add Task */
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const task = {
    name: document.getElementById("taskName").value,
    assigned: document.getElementById("assignedTo").value,
    deadline: document.getElementById("deadline").value,
    status: "Pending"
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  this.reset();
});

/* Update Status */
function updateStatus(index) {
  const statuses = ["Pending", "In Progress", "Completed"];
  let current = statuses.indexOf(tasks[index].status);
  tasks[index].status = statuses[(current + 1) % 3];
  saveTasks();
  renderTasks();
}

/* Delete Task */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

/* Load Tasks */
renderTasks();