import { fetchData } from "./services/githubService";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define command handlers
const handleHelp = () => {
  console.log("Available commands:");
  console.log("help - Show this help message");
  console.log("list <username> - List all GitHub API events from a user");
  console.log(
    "list <username> <choices> - List specific data from a user. Choices include:"
  );
  listEventNames();
  console.log("exit - Exit the CLI");
};

const handleUnknownCommand = (command: string) => {
  console.log(`Unknown command: ${command}`);
  console.log(
    'Type "help" for a list of available commands, and --h after a command to learn about it better.'
  );
};

const isValidEventType = (eventType: string): boolean => {
  const validEventTypes = new Set([
    "pushevent",
    "createevent",
    "deleteevent",
    "pullevent",
    "issueevent",
    "issuecommentevent",
    "watchevent",
    "forkevent",
    "releaseevent",
    "memberevent",
  ]);

  return validEventTypes.has(eventType.toLowerCase());
};

const listEventNames = () => {
  console.log('- "pushevent" to list all Push Events');
  console.log('- "createevent" to list all Create Events');
  console.log('- "deleteevent" to list all Delete Events');
  console.log('- "pullevent" to list all Pull Request Events');
  console.log('- "issueevent" to list all Issues Events');
  console.log('- "issuecommentevent" to list all Issue Comment Events');
  console.log('- "watchevent" to list all Watch Events');
  console.log('- "forkevent" to list all Fork Events');
  console.log('- "releaseevent" to list all Release Events');
  console.log('- "memberevent" to list all Member Events');
};

const handleListCommand = (args: string[]) =>{
  if (args.length > 3) {
    console.log(
      "Invalid number of arguments for list command. Expected maximum of: 2 (username and/or specific data type)"
    );
    return
  }
  if (args.length === 3) {
    const specificCommand: string = args[2].toLowerCase();
    if (isValidEventType(specificCommand) === false) {
      console.log("Invalid choice for list, choices are: ");
      listEventNames();
      return
    }
    console.log(specificCommand);
    return
  } 
  const username: string = args[1].toLowerCase();
  fetchData(username);
}

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
