import { Command } from "@oclif/command";
import * as open from "open";
import * as getCurrentGitBranch from "current-git-branch";
import * as nconf from "nconf";
import * as appRootPath from "app-root-path";

import { TOOL_NAME } from "../consts";
import { getNotion } from "../utils/notion";
import { getNotionRootDatabaseId } from "../utils/rootData";

export default class Open extends Command {
  static description = "Open current task in notion";

  async run() {
    const notion = await getNotion();
    const gitBranch = getCurrentGitBranch();
    nconf.file({ file: `${process.cwd()}/${TOOL_NAME}rc.json` });
    const notionProjectPageId = nconf.get("notionProjectPageId");

    // check if exists & open

    const { results: taskPages } = await notion.search({
      // @ts-ignore
      query: gitBranch,
      filter: { value: "page", property: "object" },
    });

    const foundTaskPage = taskPages[0];
    if (foundTaskPage) {
      open(getNotionAppLink(foundTaskPage.id));
    }
    // create a new page & add to database
    else {
      const { id: taskPageId } = await notion.pages.create({
        parent: {
          page_id: notionProjectPageId,
        },
        properties: {
          // @ts-ignore
          title: [{ text: { content: gitBranch } }],
        },
      });

      const notionRootDatabaseId = await getNotionRootDatabaseId();

      await notion.pages.create({
        parent: { database_id: notionRootDatabaseId },
        properties: {
          PageName: {
            // @ts-ignore
            title: [{ type: "text", text: { content: gitBranch } }],
          },
          // @ts-ignore
          PageId: {
            rich_text: [{ type: "text", text: { content: taskPageId } }],
          },
        },
      });

      open(getNotionAppLink(taskPageId));
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getNotionAppLink(pageId: string) {
  return `notion://notion.so/${pageId.split("-").join("")}`;
}
