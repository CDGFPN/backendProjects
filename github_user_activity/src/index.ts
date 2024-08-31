import { program } from './cli';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define command handlers
const handleHelp = () => {
  console.log('Available commands:');
  console.log('help - Show this help message');
  console.log('exit - Exit the CLI');
};

const handleUnknownCommand = (command: string) => {
  console.log(`Unknown command: ${command}`);
  console.log('Type "help" for a list of available commands.');
};

// Command parsing and execution
const executeCommand = (input: string) => {
  const args = input.split(' ');
  const command = args[0].toLowerCase();

  switch (command) {
    case 'help':
      handleHelp();
      break;
    case 'exit':
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
  rl.question('> ', (input) => {
    executeCommand(input);
  });
};

console.log('CLI is running. Type "help" for a list of commands or "exit" to quit.');
prompt();