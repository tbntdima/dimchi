import { Command } from "@oclif/command";
import * as open from "open";
import { getNotion } from "../utils/notion";
import {
  getCurrentGitBranchName,
  getNotionAppLink,
  getProjectNotionDatabaseId,
} from "../utils/rootData";

export default class EditLogs extends Command {
  static description = "Edit current project's logs.";

  async run() {
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
      const databaseTaskRowPageId = databaseQueryResults[0].id;

      const taskLogDatabaseId =
        // @ts-ignore
        databaseQueryResults[0].properties.SubPageLogId.rich_text[0].plain_text;

      open(getNotionAppLink(taskLogDatabaseId));

      // update database last updated
      await notion.pages.update({
        page_id: databaseTaskRowPageId,
        properties: {
          // @ts-ignore
          SubPageLogLastUpdated: {
            date: { start: new Date().toISOString() },
          },
        },
      });
    }
  }
}
