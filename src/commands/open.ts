import { Command } from "@oclif/command";
import * as open from "open";

import { getNotion } from "../utils/notion";
import {
  getCurrentGitBranchName,
  getProjectNotionPageid,
  getProjectNotionDatabaseId,
  getNotionAppLink,
} from "../utils/rootData";

export default class Open extends Command {
  static description = "Open current task in notion";

  async run() {
    const notion = await getNotion();
    const gitBranchName = getCurrentGitBranchName();

    // Check if exists & open
    const projectNotionDatabaseId = getProjectNotionDatabaseId();

    const { results: databaseQueryResults } = await notion.databases.query({
      database_id: projectNotionDatabaseId,
      filter: {
        property: "SubPageName",
        text: { equals: gitBranchName },
      },
    });

    if (databaseQueryResults.length > 0) {
      // open page
      // TODO: add plugin to enchance search (maybe select)
      const existingTaskNotionPageId =
        // @ts-ignore
        databaseQueryResults[0].properties.SubPageId.rich_text[0].plain_text;
      open(getNotionAppLink(existingTaskNotionPageId));
    } else {
      // create task page
      const notionProjectPageId = getProjectNotionPageid();

      const { id: taskPageId } = await notion.pages.create({
        parent: {
          page_id: notionProjectPageId,
        },
        properties: {
          // @ts-ignore
          title: [{ text: { content: gitBranchName } }],
        },
      });
      // create task log database
      const { id: taskLogDatabaseId } = await notion.databases.create({
        parent: {
          page_id: taskPageId,
        },
        title: [{ type: "text", text: { content: "_progress-log" } }],
        properties: {
          Action: { title: {} },
          ActionDate: { date: {} },
        },
      });
      // add task and log to project database
      await notion.pages.create({
        parent: { database_id: projectNotionDatabaseId },
        properties: {
          // @ts-ignore
          SubPageName: {
            title: [{ type: "text", text: { content: gitBranchName } }],
          },
          // @ts-ignore
          SubPageId: {
            rich_text: [{ type: "text", text: { content: taskPageId } }],
          },
          // @ts-ignore
          SubPageLogId: {
            rich_text: [{ type: "text", text: { content: taskLogDatabaseId } }],
          },
          // @ts-ignore
          SubPageLogLastUpdated: {
            date: { start: new Date().toISOString() },
          },
        },
      });
      // open page
      open(getNotionAppLink(taskPageId));
    }
  }
}
