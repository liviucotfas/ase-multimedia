/**
 * app.ts
 *
 * This TypeScript file serves as the main entry point for a Progressive Web Application (PWA) that manages a simple to-do list.
 * It registers a service worker, handles offline caching, and provides functionality for creating, displaying, and deleting tasks.
 * The application also supports PWA installation prompts for mobile and desktop environments.
 *
 * The code is structured as follows:
 * 1. **Service Worker Registration**: Checks if service workers are supported by the browser, and if so, registers a service worker to enable offline functionality.
 * 2. **DOM Element Selection**: Selects necessary HTML elements (form, input, list) for user interaction.
 * 3. **Task Interface and State Management**: Defines an interface for Task objects and retrieves an initial list of tasks from `localStorage`.
 * 4. **Core Functions**:
 *    - `renderTasks()`: Renders the list of tasks on the page.
 *    - `addTask(taskText: string)`: Adds a new task to the list, saves it in `localStorage`, and re-renders the task list.
 *    - `deleteTask(taskId: number)`: Removes a task by its ID, updates `localStorage`, and re-renders the task list.
 * 5. **Form Submission Handling**: Adds a submit event listener to handle task creation and prevent default form submission behavior.
 * 6. **PWA Install Prompt Handling**: Listens for the `beforeinstallprompt` event, prevents the default install prompt, and logs when the app is eligible for installation.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

interface Task {
  id: number;
  text: string;
}

const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

function addTask(taskText: string) {
  const newTask: Task = {
    id: Date.now(),
    text: taskText,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(taskId: number) {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index > -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInput.value.trim()) {
    addTask(todoInput.value.trim());
    todoInput.value = "";
  }
});

renderTasks();

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("beforeinstallprompt fired");
});
