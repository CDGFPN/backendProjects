import { Command } from 'commander';
import { helloCommand } from './commands/hello';
// import { fetchData } from './services/githubService';

const program = new Command();

program
  .name('greet')
  .description('A simple CLI to greet someone')
  .version('1.0.0');

program
  .command('hello <name>')
  .description('Greet someone by name')
  .action((name: string) => {
    helloCommand(name);
  });

// program
//   .command('fetch-github')
//   .description('Fetch GitHub user info')
//   .action(async () => {
//     await fetchData();
//   });

export { program };