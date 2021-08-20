# dimchi

Simplify the process of writing notes by combining your workflow with cli and notes editor (notion.so)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dimchi.svg)](https://npmjs.org/package/dimchi)
[![Downloads/week](https://img.shields.io/npm/dw/dimchi.svg)](https://npmjs.org/package/dimchi)
[![License](https://img.shields.io/npm/l/dimchi.svg)](https://github.com/tbntdima/dimchi/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Getting started

```sh-session
$ npm install -g dimchi
...
```

## Global setup

You need to do this only once.
Follow [these steps from notion documentation](https://developers.notion.com/docs#step-1-create-an-integration) to get your integration token (notion secret key)

Then run:

```sh-session
dimchi init
```

## Project setup

You will need to do this for every new project.

- open notion webapp
- create a page project
- on right top corner click on share, and share page with your integration
- get page id from the url

Then run:

Then run:

```sh-session
dimchi add-project
```

That's it, you are set to go 🚀

# Commands

<!-- commands -->

- [`dimchi add-log [MESSAGE]`](#dimchi-add-log-message)
- [`dimchi add-project`](#dimchi-add-project)
- [`dimchi edit-logs [FILE]`](#dimchi-edit-logs-file)
- [`dimchi hello [FILE]`](#dimchi-hello-file)
- [`dimchi help [COMMAND]`](#dimchi-help-command)
- [`dimchi init`](#dimchi-init)
- [`dimchi log`](#dimchi-log)
- [`dimchi open`](#dimchi-open)

## `dimchi add-log [MESSAGE]`

describe the command here

```
USAGE
  $ dimchi add-log [MESSAGE]
```

_See code: [src/commands/add-log.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/add-log.ts)_

## `dimchi add-project`

```
USAGE
  $ dimchi add-project
```

_See code: [src/commands/add-project.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/add-project.ts)_

## `dimchi edit-logs [FILE]`

describe the command here

```
USAGE
  $ dimchi edit-logs [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/edit-logs.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/edit-logs.ts)_

## `dimchi hello [FILE]`

describe the command here

```
USAGE
  $ dimchi hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dimchi hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/hello.ts)_

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

_See code: [src/commands/init.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/init.ts)_

## `dimchi log`

describe the command here

```
USAGE
  $ dimchi log
```

_See code: [src/commands/log.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/log.ts)_

## `dimchi open`

Open current task in notion

```
USAGE
  $ dimchi open
```

_See code: [src/commands/open.ts](https://github.com/tbntdima/dimchi/blob/v0.0.4/src/commands/open.ts)_

<!-- commandsstop -->
