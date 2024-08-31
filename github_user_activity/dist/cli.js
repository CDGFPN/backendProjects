"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const commander_1 = require("commander");
const hello_1 = require("./commands/hello");
// import { fetchData } from './services/githubService';
const program = new commander_1.Command();
exports.program = program;
program
    .name('greet')
    .description('A simple CLI to greet someone')
    .version('1.0.0');
program
    .command('hello <name>')
    .description('Greet someone by name')
    .action((name) => {
    (0, hello_1.helloCommand)(name);
});
