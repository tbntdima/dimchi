import { Command } from "@oclif/command";
import { getNotion } from "../utils/notion";
import {
  getCurrentGitBranchName,
  getProjectNotionDatabaseId,
} from "../utils/rootData";

export default class AddLog extends Command {
  static description = "describe the command here";

  static args = [{ name: "message" }];

  async run() {
    const {
      args: { message },
    } = this.parse(AddLog);

    const notion = await getNotion();
    const projectNotionDatabaseId = getProjectNotionDatabaseId();
    const gitBranchName = getCurrentGitBranchName();

    // search in database for current task
    const { results: databaseQueryResults } = await notion.databases.query({
      database_id: projectNotionDatabaseId,
      filter: {
        property: "SubPageName",
        text: { equals: gitBranchName },
      },
    });
    if (databaseQueryResults.length > 0) {
      const taskLogDatabaseId =
        // @ts-ignore
        databaseQueryResults[0].properties.SubPageLogId.rich_text[0].plain_text;

      const databaseTaskRowPageId = databaseQueryResults[0].id;

      // update log
      await notion.pages.create({
        parent: { database_id: taskLogDatabaseId },
        properties: {
          // @ts-ignore
          Action: {
            title: [{ type: "text", text: { content: message } }],
          },
          // @ts-ignore
          ActionDate: {
            date: { start: new Date().toISOString().split("T")[0] },
          },
        },
      });

      // update database last updated
      await notion.pages.update({
        page_id: databaseTaskRowPageId,
        properties: {
          // @ts-ignore
          SubPageLogLastUpdated: {
            date: { start: new Date().toISOString().split("T")[0] },
          },
        },
      });
    }
  }
}
