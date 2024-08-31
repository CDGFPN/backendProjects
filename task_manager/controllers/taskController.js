const TaskModel = require("../models/taskModel.js");

const addTask = (description) => TaskModel.addTask(description);

const deleteTask = (id) => TaskModel.deleteTask(id);

const markInProgress = (id) => TaskModel.markInProgress(id);

const markAsDone = (id) => TaskModel.markAsDone(id);

const updateTask = (id, description) => TaskModel.updateTask(id, description);

const listTasks = (choice) => TaskModel.listTasks(choice);

module.exports = {
  addTask,
  deleteTask,
  markInProgress,
  markAsDone,
  updateTask,
  listTasks
};
