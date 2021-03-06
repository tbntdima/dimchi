# dimchi

Simplify the process of writing notes by combining your workflow with cli and notes editor (notion.so)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dimchi.svg)](https://npmjs.org/package/dimchi)
[![Downloads/week](https://img.shields.io/npm/dw/dimchi.svg)](https://npmjs.org/package/dimchi)
[![License](https://img.shields.io/npm/l/dimchi.svg)](https://github.com/tbntdima/dimchi/blob/master/package.json)

<!-- toc -->

- [dimchi](#dimchi)
- [Getting started](#getting-started)
- [Commands](#commands)
<!-- tocstop -->

# Getting started

```sh-session
$ npm install -g dimchi
```

## Global setup

You need to do this only once.
Follow ["Step 1: Create an integration" from notion documentation](https://developers.notion.com/docs#step-1-create-an-integration) to get your integration token (notion secret key)

Then run:

```sh-session
dimchi init
```

## Project setup

You will need to do this for every new project.

- open notion webapp
- create a page project
- on right top corner click on share, and share page with your integration
  ![Screenshot 2021-08-20 at 15 42 47](https://user-images.githubusercontent.com/28235413/130242535-53d02996-f7d0-4af5-a44e-f651c7b2403a.png)
- get page id from the url
  ![Screenshot 2021-08-20 at 15 43 41](https://user-images.githubusercontent.com/28235413/130242655-d9f4487b-cf5c-46c9-bf45-2a850c588899.png)

Then run:

```sh-session
dimchi add-project
```

That's it, you are set to go 🚀

# Commands

<!-- commands -->

- [`dimchi add-log [MESSAGE]`](#dimchi-add-log-message)
- [`dimchi add-project`](#dimchi-add-project)
- [`dimchi edit-logs`](#dimchi-edit-logs)
- [`dimchi help [COMMAND]`](#dimchi-help-command)
- [`dimchi init`](#dimchi-init)
- [`dimchi log`](#dimchi-log)
- [`dimchi open`](#dimchi-open)

## `dimchi add-log [MESSAGE]`

Add a log message of your progress.

```
USAGE
  $ dimchi add-log [MESSAGE]
```

_See code: [src/commands/add-log.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/add-log.ts)_

## `dimchi add-project`

Connect your local repository with notion project page.

```
USAGE
  $ dimchi add-project
```

_See code: [src/commands/add-project.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/add-project.ts)_

## `dimchi edit-logs`

Edit current project's logs.

```
USAGE
  $ dimchi edit-logs
```

_See code: [src/commands/edit-logs.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/edit-logs.ts)_

## `dimchi help [COMMAND]`

display help for dimchi

```
USAGE
  $ dimchi help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `dimchi init`

Init config

```
USAGE
  $ dimchi init

OPTIONS
  -d, --destroy
  -u, --update
```

_See code: [src/commands/init.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/init.ts)_

## `dimchi log`

Print logs of current project.

```
USAGE
  $ dimchi log
```

_See code: [src/commands/log.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/log.ts)_

## `dimchi open`

Open or create a new task page in notion.

```
USAGE
  $ dimchi open

OPTIONS
  -n, --name=name
```

_See code: [src/commands/open.ts](https://github.com/tbntdima/dimchi/blob/v0.1.0/src/commands/open.ts)_

<!-- commandsstop -->
