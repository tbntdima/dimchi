dimchi
======

Simplify the process of writing notes by combining your workflow with cli and notes editor (notion.so)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dimchi.svg)](https://npmjs.org/package/dimchi)
[![Downloads/week](https://img.shields.io/npm/dw/dimchi.svg)](https://npmjs.org/package/dimchi)
[![License](https://img.shields.io/npm/l/dimchi.svg)](https://github.com/tbntdima/dimchi/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dimchi
$ dimchi COMMAND
running command...
$ dimchi (-v|--version|version)
dimchi/0.0.3 darwin-x64 node-v14.17.3
$ dimchi --help [COMMAND]
USAGE
  $ dimchi COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dimchi add-project PROJECTNAME`](#dimchi-add-project-projectname)
* [`dimchi hello [FILE]`](#dimchi-hello-file)
* [`dimchi help [COMMAND]`](#dimchi-help-command)
* [`dimchi init`](#dimchi-init)
* [`dimchi open`](#dimchi-open)

## `dimchi add-project PROJECTNAME`

```
USAGE
  $ dimchi add-project PROJECTNAME

ARGUMENTS
  PROJECTNAME  Name of the project
```

_See code: [src/commands/add-project.ts](https://github.com/tbntdima/dimchi/blob/v0.0.3/src/commands/add-project.ts)_

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

_See code: [src/commands/hello.ts](https://github.com/tbntdima/dimchi/blob/v0.0.3/src/commands/hello.ts)_

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

_See code: [src/commands/init.ts](https://github.com/tbntdima/dimchi/blob/v0.0.3/src/commands/init.ts)_

## `dimchi open`

Open current task in notion

```
USAGE
  $ dimchi open
```

_See code: [src/commands/open.ts](https://github.com/tbntdima/dimchi/blob/v0.0.3/src/commands/open.ts)_
<!-- commandsstop -->
