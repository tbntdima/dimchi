import { Command } from "@oclif/command";
import * as nconf from "nconf";
import * as fs from "fs";
import * as inquirer from "inquirer";

import { TOOL_NAME } from "../consts";
import { getNotion } from "../utils/notion";

export default class AddProject extends Command {
  static description =
    "Connect your local repository with notion project page.";

  async run() {
    // Check if tool is initialized
    nconf.file({ file: `./${TOOL_NAME}rc.json` });
    const existingProjectNotionPageId = nconf.get("projectNotionPageId");

    if (existingProjectNotionPageId) {
      this.log("Seems like the project has already been added.");
      return;
    }

    // Add notion project id to rc file & create a database
    // Ask for a project ID
    const { projectNotionPageId } = await inquirer.prompt([
      {
        type: "text",
        name: "projectNotionPageId",
        message: "Project notion page id:",
      },
    ]);

    const notion = await getNotion();

    const { id: projectNotionDatabaseId } = await notion.databases.create({
      parent: {
        page_id: projectNotionPageId,
      },
      title: [{ type: "text", text: { content: "_database" } }],
      properties: {
        SubPageName: { title: {} },
        SubPageId: { rich_text: {} },
        SubPageLogId: { rich_text: {} },
        SubPageLogLastUpdated: { date: {} },
      },
    });

    // add rc file to .git/info/exclude so it's ignored by git
    const excludeFilePath = `./.git/info/exclude`;
    const excludeFileContent = await fs
      .readFileSync(excludeFilePath)
      .toString();
    if (!excludeFileContent.includes(`${TOOL_NAME}rc.json`)) {
      await fs.appendFileSync(`./.git/info/exclude`, `\n${TOOL_NAME}rc.json`);
    }

    // generate rc file
    nconf.set("projectNotionPageId", projectNotionPageId);
    nconf.set("projectNotionDatabaseId", projectNotionDatabaseId);
    nconf.save((error: Error) => {
      if (error) this.error(error);
    });

    this.log("Project has been added.");
  }
}
