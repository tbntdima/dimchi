import { Command } from "@oclif/command";
import { getNotion } from "../utils/notion";
import {
  getCurrentGitBranchName,
  getProjectNotionDatabaseId,
} from "../utils/rootData";

export default class Log extends Command {
  static description = "Print logs of current project.";

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
      const taskLogDatabaseId =
        // @ts-ignore
        databaseQueryResults[0].properties.SubPageLogId.rich_text[0].plain_text;

      const { results } = await notion.databases.query({
        database_id: taskLogDatabaseId,
      });

      const logs = results
        .map((log) => {
          return {
            // @ts-ignore
            action: log.properties.Action.title[0]?.plain_text,
            // @ts-ignore
            date: log.properties.ActionDate?.date.start,
          };
        })
        .filter((log) => log.action && log.date)
        .sort((logA, logB) => {
          // @ts-ignore
          return new Date(logA.date) - new Date(logB.date);
        })
        .map((log) => ({ action: log.action, date: log.date.split("T")[0] }))
        .reduce((_groupedLogs: Record<string, { actions: string[] }>, log) => {
          if (_groupedLogs[log.date]) {
            _groupedLogs[log.date].actions.push(log.action);
          } else {
            _groupedLogs[log.date] = { actions: [log.action] };
          }
          return _groupedLogs;
        }, {});

      for (const [date, values] of Object.entries(logs)) {
        console.log(date);
        values.actions.forEach((action) => console.log(`- ${action}`));
      }
    }
  }
}
