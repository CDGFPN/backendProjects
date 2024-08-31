# Task Manager CLI

## Overview

The Task Manager CLI is a command-line interface application for managing tasks. It allows users to add, delete, mark tasks as in-progress or done, and list tasks based on their status. The application uses a local file to store task data.

## Features

- **Add Task**: Add a new task with a description.
- **Delete Task**: Delete a task by its ID.
- **Mark In-Progress**: Mark a task as in-progress by its ID.
- **Mark Done**: Mark a task as done by its ID.
- **List Tasks**: List all tasks or filter tasks by their status (all, todo, in-progress).

## Installation

1. Clone the repository:
    ```
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```
    npm install
    ```

## Usage

The CLI uses the `commander` package to handle commands. Below are the available commands and their usage:

### Add a Task
```
npm run task add <description>
```


Example:

```
npm run task add "Finish the project documentation"
```

### Update Tasks
```
npm run task update <id> <description>
```

Example:

```
npm run task update 1 "Revise presentation slides"
```

### Delete a Task
```
npm run task delete <id>
```

Example:

```
npm run task delete 1
```

### Mark a Task as In-Progress
```
npm run task mark-in-progress <id>
```
Example:

```
npm run task mark-in-progress 1
```
### Mark a Task as Done
```
npm run task mark-done <id>
```
Example:

```
npm run task mark-done 1
```
### List Tasks
```
npm run task list <choice>
```

### `<choice>` can be one of the following:

- `all`: List all tasks.
- `todo`: List tasks that are yet to be done.
- `done`: List tasks that are done.
- `in-progress`: List tasks that are in-progress.

Example:

```
npm run task list all
```