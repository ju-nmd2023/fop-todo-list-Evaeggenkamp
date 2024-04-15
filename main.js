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

//delete button//

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("mousedown", function () {
    button.classList.toggle("active");
  });

  button.addEventListener("mouseup", function (event) {
    event.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    todoList.innerHTML = "";

    for (let i = tasks.length - 1; i >= 0; i--) {
      const taskText = tasks[i].title;
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.value = i;

      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = taskText;
      if (tasks[i].completed === true) {
        taskTextElement.classList.add("completed");
      }
      taskItem.appendChild(taskTextElement);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", function () {
        tasks.splice(this.parentNode.value, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });

      taskItem.appendChild(deleteButton);

      taskTextElement.addEventListener("click", function () {
        const todo = tasks[this.parentNode.value];
        if (todo) {
          todo.completed = !todo.completed;
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      });
      todoList.appendChild(taskItem);
    }
  }

  renderTasks();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value;
    if (taskText !== "") {
      tasks.push({ title: taskText, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      input.value = "";
    }
  });
});
