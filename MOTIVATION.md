# Overview

Initial idea of `dimchi` was very simple - open my notes taking app via terminal. But in the process I realized that it can do so much more.

## Motivation

Taking notes while doing a task is a common thing for egeneers.

But at one point I found myself struggling with them.

Traditional way of writing notes with pencil and notebook has lots of disadvantages - hard to organize, hard to edit, hard to search and so on.

Making notes in some app is much better. The only thing I don't like about them is that you have to deal with UI. Sometimes I'm jsut feeling too lazy opening app, looking for my project folder, copying my git branch name (e.g. TASK-104), clicking on that "+" button. It just feels slow & uncool to me. Though the main interface is still nice, it's easy to add checkboxes, links, tables, titles...

I thought it would be cool to automate these things (get current git branch name -> search for the page in notes app -> open this specific page in an app / create a new page) and wrap them into a small cli, so I can just use the terminal, where I spend a lot of time while developing, and it's always open.

While that was the main idea, there's basically a huge room for additional features like:

- create a note with a template, automatically linking it with jira task
- keep track of current task status by logging the progress
- generate logs reports
- generate daily standups
- generate PR description
- ...

## MVP0

- choose a notes taking app

- create a cli command to be able to create/open note page about current task, based on git branch name

- create a cli command to add/edit logs of the progress

- create a cli command to log the progress of the current task

## MVP1

- create a cli command to generate a daily standup (progress of tasks you work on yesterday)

- connect cli to git hooks, to ask if to add commit/checkout to the logs
