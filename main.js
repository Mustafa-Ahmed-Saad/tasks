// input element that used more than one time
const titleEl = document.getElementById("taskTitle");
const descriptionEl = document.getElementById("taskDescription");

// add event listener when reload page
window.onload = function () {
  saveInLocalStorage("existingTaskId", null);
};

// addTask and editTask
function addTask(tasks) {
  const taskId = getFromLocalStorage("existingTaskId");

  //   task exist
  if (taskId) {
    console.log("run if");
    const title = titleEl.value;
    const description = descriptionEl.value;
    // if title is empty
    if (title.trim() === "") return;

    const task = tasks.find((task) => task.id === Number(taskId));
    task.title = title;
    task.description = description;
    // if we want to change completed
    // task.completed = false;
    saveInLocalStorage("existingTaskId", null);

    // or
    // localStorage.removeItem("existingTaskId");
    saveInLocalStorage("tasks", tasks);
  } else {
    console.log("run else");
    const title = titleEl.value;
    const description = descriptionEl.value;
    if (title.trim() === "") return;
    tasks.push({
      id: Date.now(),
      title,
      description,
      completed: false,
    });
    saveInLocalStorage("tasks", tasks);
  }
  titleEl.value = "";
  descriptionEl.value = "";
}

function toggleComplete(task, tasks) {
  //   const task = tasks.find((task) => task.id === taskId);
  task.completed = !task.completed;
  saveInLocalStorage("tasks", tasks);
}

function editTask(task, tasks) {
  //   const task = tasks.find((task) => task.id === taskId);
  titleEl.value = task.title;
  descriptionEl.value = task.description;
  saveInLocalStorage("existingTaskId", task.id);
}

function deleteTask(taskId, tasks) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveInLocalStorage("tasks", tasks);
  saveInLocalStorage("existingTaskId", null);
  // refresh page
  location.reload();
}

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
