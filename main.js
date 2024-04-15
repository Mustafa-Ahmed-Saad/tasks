// *********************************************** helper functions ***********************************************
const titleEl = document.getElementById("taskTitle");
const descriptionEl = document.getElementById("taskDescription");

// *********************************************** helper functions ***********************************************
const saveInLocalStorage = (key, value) => {
  // convert value to string to store this value in local storage
  if (value !== null) {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  // convert string that came from local storage to its type
  return value ? JSON.parse(value) : null;
};

// *********************************************** when window load ***********************************************
window.onload = function () {
  saveInLocalStorage("existingTaskId", null);
};

// *********************************************** Alpine.js logic ***********************************************
document.addEventListener("alpine:init", () => {
  Alpine.data("tasksManager", () => ({
    existingTaskId: JSON.parse(localStorage.getItem("existingTaskId")) || null,
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    addTask() {
      // .............
      const taskId = getFromLocalStorage("existingTaskId");
      //   task exist
      if (taskId) {
        const title = titleEl.value;
        const description = descriptionEl.value;
        // if title is empty
        if (title.trim() === "") return;

        const task = this.tasks.find((task) => task.id === Number(taskId));
        task.title = title;
        task.description = description;
        // if we want to change completed
        // task.completed = false;
        this.existingTaskId = null;
        saveInLocalStorage("existingTaskId", null);

        // or
        // localStorage.removeItem("existingTaskId");
        saveInLocalStorage("tasks", this.tasks);
      } else {
        const title = titleEl.value;
        const description = descriptionEl.value;
        if (title.trim() === "") return;
        this.tasks.push({
          id: Date.now(),
          title,
          description,
          completed: false,
        });
        saveInLocalStorage("tasks", this.tasks);
      }
      titleEl.value = "";
      descriptionEl.value = "";
    },
    // ..............
    toggleComplete(task) {
      //   const task = tasks.find((task) => task.id === taskId);
      task.completed = !task.completed;
      saveInLocalStorage("tasks", this.tasks);
    },
    editTask(task) {
      //   const task = tasks.find((task) => task.id === taskId);
      titleEl.value = task.title;
      descriptionEl.value = task.description;
      this.existingTaskId = task.id;
      saveInLocalStorage("existingTaskId", task.id);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      saveInLocalStorage("tasks", this.tasks);
      this.existingTaskId = null;
      saveInLocalStorage("existingTaskId", null);
    },
  }));
});
