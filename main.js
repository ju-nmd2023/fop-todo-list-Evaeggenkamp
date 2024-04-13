function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;
  document.getElementById("time").textContent = timeString;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("numeric", options);
  document.getElementById("date").textContent = dateString;
}
setInterval(updateTime, 60000);

updateTime();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    todoList.innerHTML = "";

    for (let i = tasks.length - 1; i >= 0; i--) {
      const taskText = tasks[i];
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;

      const deleteButton = document.createElement("li");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", function () {
        tasks.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      taskItem.appendChild(deleteButton);

      taskItem.addEventListener("click", function () {
        this.classList.toggle("completed");
      });
      todoList.insertBefore(taskItem, todoList.firstChild);
    }
  }

  renderTasks();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();
    if (taskText !== "") {
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      input.value = "";
    }
  });
});
