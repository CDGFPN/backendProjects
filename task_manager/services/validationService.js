const dataValidation = {
  descriptionIsValid: (description) => {
    if (!description.trim()) {
      console.log("Task description cannot be empty!");
      return false;
    }
    return true;
  },

  taskIdIsValid: (id, data) => {
    const taskIndex = data.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      console.log(`Task with ID:${id} not found!`);
      return -1;
    }
    return taskIndex;
  },

  dataIsEmpty: (data) => {
    if (data.length === 0) {
      console.log("No tasks found!");
      return true;
    }
    return false;
  },
};

module.exports = dataValidation;
