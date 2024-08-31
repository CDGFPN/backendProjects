const { addTask, deleteTask, markInProgress, markAsDone, updateTask, listTasks } = require("../controllers/taskController.js");
const { Command } = require("commander");
const program = new Command();

program
  .command("add <description>")
  .description("Add a new task")
  .action(addTask);

program
  .command("delete <id>")
  .description("Delete a task")
  .action(deleteTask);

program 
  .command("mark-in-progress <id>")
  .description("Mark a task as in-progress")
  .action(markInProgress);

program
  .command("mark-done <id>")
  .description("Mark a task as done")
  .action(markAsDone);

program
  .command("update <id> <description>")
  .description("Update a task description by ID")
  .action((id, description) => {
    updateTask(id, description);
  });

program
  .command("list <choice>") // choice can be 'all', 'todo', 'done', or 'in-progress'
  .description("List all tasks or tasks with specific status\nOptions for <choice>: 'all', 'todo', 'done', 'in-progress'")
  .action(listTasks);

  


program.parse(process.argv);