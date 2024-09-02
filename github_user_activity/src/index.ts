import * as readline from "readline";
import { handleHelp, handleUnknownCommand, handleListCommand } from "./commandHandler";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Command parsing and execution
const executeCommand = (input: string) => {
  const args = input
    .split(" ")
    .filter(Boolean)
    .map((word) => word.trim());
  const command = args[0].toLowerCase();

  switch (command) {
    case "help":
      handleHelp();
      break;
    case "list":
      handleListCommand(args)
      break;
    case "exit":
      rl.close();
      return;
    default:
      handleUnknownCommand(command);
      break;
  }

  // Continue prompting after executing the command
  prompt();
};

const prompt = () => {
  rl.question("> ", (input) => {
    executeCommand(input);
  });
};

console.log(
  'CLI is running. Type "help" for a list of commands or "exit" to quit.'
);
prompt();
