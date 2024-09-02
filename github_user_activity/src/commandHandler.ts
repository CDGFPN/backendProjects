import { fetchData } from "./services/githubService";

// Define command handlers
export const handleHelp = () => {
  console.log("Available commands:");
  console.log("help - Show this help message");
  console.log("list <username> - List all GitHub API events from a user");
  console.log(
    "list <username> <choices> - List specific data from a user. Choices include:"
  );
  listDataNames();
  console.log("exit - Exit the CLI");
};

export const handleUnknownCommand = (command: string) => {
  console.log(`Unknown command: ${command}`);
  console.log('Type "help" for a list of available commands.');
};

export const isValidEventType = (eventType: string): boolean => {
  const validEventTypes = new Set([
    "repo",
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

export const listDataNames = () => {
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

export const handleListCommand = (args: string[]) => {
  if (args.length === 1 || args.length > 3) {
    console.log(
      "Invalid number of arguments for list command. Expected maximum of: 2 (username and/or specific data type)"
    );
    return;
  }
  const username: string = args[1].toLowerCase();
  if (args.length === 3) {
    const eventType: string = args[2].toLowerCase();
    if (isValidEventType(eventType) === false) {
      console.log("Invalid choice for list, choices are: ");
      listDataNames();
      return;
    }
    fetchData(username, eventType);
    return;
  }
  fetchData(username);
};

