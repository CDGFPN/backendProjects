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
const readline = __importStar(require("readline"));
const commandHandler_1 = require("./commandHandler");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Command parsing and execution
const executeCommand = (input) => {
    const args = input
        .split(" ")
        .filter(Boolean)
        .map((word) => word.trim());
    const command = args[0].toLowerCase();
    switch (command) {
        case "help":
            (0, commandHandler_1.handleHelp)();
            break;
        case "list":
            (0, commandHandler_1.handleListCommand)(args);
            break;
        case "exit":
            rl.close();
            return;
        default:
            (0, commandHandler_1.handleUnknownCommand)(command);
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
