"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const githubService_1 = require("./services/githubService");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Define command handlers
const handleHelp = () => {
    console.log("Available commands:");
    console.log("help - Show this help message");
    console.log("list <username> - List all GitHub API events from a user");
    console.log("list <username> <choices> - List specific data from a user. Choices include:");
    listDataNames();
    console.log("exit - Exit the CLI");
};
const handleUnknownCommand = (command) => {
    console.log(`Unknown command: ${command}`);
    console.log('Type "help" for a list of available commands, and --h after a command to learn about it better.');
};
const isValidEventType = (eventType) => {
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
const listDataNames = () => {
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
const handleListCommand = (args) => {
    if (args.length === 1 || args.length > 3) {
        console.log("Invalid number of arguments for list command. Expected maximum of: 2 (username and/or specific data type)");
        return;
    }
    const username = args[1].toLowerCase();
    if (args.length === 3) {
        const eventType = args[2].toLowerCase();
        if (isValidEventType(eventType) === false) {
            console.log("Invalid choice for list, choices are: ");
            listDataNames();
            return;
        }
        (0, githubService_1.fetchData)(username, eventType);
        return;
    }
    (0, githubService_1.fetchData)(username);
};
// Command parsing and execution
const executeCommand = (input) => {
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
            handleListCommand(args);
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
console.log('CLI is running. Type "help" for a list of commands or "exit" to quit.');
prompt();
