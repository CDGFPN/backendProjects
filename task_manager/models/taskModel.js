const fileHandler = require("../services/fileService.js");
const dataValidation = require("../services/validationService.js");

class TaskModel {
  constructor(description) {
    this.id = fileHandler.generateId();
    this.description = description;
    this.status = "todo";
    this.createdAt = Math.floor(Date.now() / 1000);
    this.updatedAt = Math.floor(Date.now() / 1000);
  }

  static fetchAll() {
    fileHandler.isDataJsonFilePresent();
    return fileHandler.fetchData();
  }

  static saveAll(data) {
    fileHandler.saveData(data);
  }

  static addTask(description) {
    if (!dataValidation.descriptionIsValid(description)) return;
    fileHandler.createFileIfNotExists();
    const data = this.fetchAll();
    const newTask = new TaskModel(description);
    data.push(newTask);
    this.saveAll(data);
    console.log(`Task "${description}" added successfully! (ID:${newTask.id})`);
  }

  static deleteTask(id) {
    fileHandler.isDataJsonFilePresent();
    const data = this.fetchAll();
    if (dataValidation.dataIsEmpty(data)) return;

    const taskIndex = dataValidation.taskIdIsValid(id, data);
    if (taskIndex === -1) return;

    data.splice(taskIndex, 1);
    this.saveAll(data);
    console.log(`Task with ID:${id} deleted successfully!`);
  }

  static updateTask(id, description) {
    fileHandler.isDataJsonFilePresent();
    if (!dataValidation.descriptionIsValid(description)) return;

    const data = this.fetchAll();
    if (dataValidation.dataIsEmpty(data)) return;

    const taskIndex = dataValidation.taskIdIsValid(id, data);
    if (taskIndex === -1) return;

    data[taskIndex].description = description;
    data[taskIndex].updatedAt = Math.floor(Date.now() / 1000);
    this.saveAll(data);
    console.log(`Task with ID:${id} updated successfully!`);
  }

  static markAsDone(id) {
    fileHandler.isDataJsonFilePresent();
    const data = this.fetchAll();
    if (dataValidation.dataIsEmpty(data)) return;

    const taskIndex = dataValidation.taskIdIsValid(id, data);
    if (taskIndex === -1) return;

    data[taskIndex].status = "done";
    data[taskIndex].updatedAt = Math.floor(Date.now() / 1000);
    this.saveAll(data);
    console.log(`Task with ID:${id} marked as done!`);
  }

  static markInProgress(id) {
    fileHandler.isDataJsonFilePresent();
    const data = this.fetchAll();
    if (dataValidation.dataIsEmpty(data)) return;

    const taskIndex = dataValidation.taskIdIsValid(id, data);
    if (taskIndex === -1) return;

    data[taskIndex].status = "in-progress";
    data[taskIndex].updatedAt = Math.floor(Date.now() / 1000);
    this.saveAll(data);
    console.log(`Task with ID:${id} marked as in-progress!`);
  }

  static listTasks(choice) {
    fileHandler.isDataJsonFilePresent();
    const data = this.fetchAll();
    if (dataValidation.dataIsEmpty(data)) return;

    switch (choice) {
      case "all":
        console.log("All tasks:");
        data.forEach((task) => {
          console.log(
            `ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`
          );
        });
        break;
      case "todo":
        const todoTasks = data.filter((task) => task.status === "todo");
        if (todoTasks.length === 0) {
          console.log("No tasks found!");
          return;
        }
        console.log("Todo tasks:");
        todoTasks.forEach((task) => {
          console.log(
            `ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`
          );
        });
        break;
      case "in-progress":
        const inProgressTasks = data.filter(
          (task) => task.status === "in-progress"
        );
        if (inProgressTasks.length === 0) {
          console.log("No tasks found!");
          return;
        }
        console.log("In-progress tasks:");
        inProgressTasks.forEach((task) => {
          console.log(
            `ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`
          );
        });
        break;
      case "done":
        const doneTasks = data.filter((task) => task.status === "done");
        if (doneTasks.length === 0) {
          console.log("No tasks found!");
          return;
        }
        console.log("Done tasks:");
        doneTasks.forEach((task) => {
          console.log(
            `ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`
          );
        });
        break;
      default:
        console.log("Invalid choice!\nOptions for <choice>: 'all', 'todo', 'done', 'in-progress'");
    }
  }
}

module.exports = TaskModel;