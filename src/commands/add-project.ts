import { Command } from "@oclif/command";
import * as nconf from "nconf";
import * as appRootPath from "app-root-path";
import * as fs from "fs";

import { TOOL_NAME } from "../consts";
import { getNotion } from "../utils/notion";
import { getNotionRootPageId } from "../utils/rootData";

export default class AddProject extends Command {
  static args = [
    {
      name: "projectName",
      required: true,
      description: "Name of the project",
    },
  ];

  async run() {
    const {
      args: { projectName },
    } = this.parse(AddProject);

    // check if tool is initialized
    nconf.file({ file: `${process.cwd()}/${TOOL_NAME}rc.json` });
    const existingNotionProjectPageId = nconf.get("notionProjectPageId");

    if (existingNotionProjectPageId) {
      this.log("Project was already added");
      return;
    }

    // create a notion page with projectName
    const notion = await getNotion();
    const notionRootPageId = await getNotionRootPageId();
    const { id: notionProjectPageId } = await notion.pages.create({
      parent: {
        page_id: notionRootPageId,
      },
      properties: {
        // @ts-ignore
        title: [{ text: { content: projectName } }],
      },
    });

    // git ignore rc file
    const excludeFilePath = `${appRootPath.path}/.git/info/exclude`;
    const excludeFileContent = await fs
      .readFileSync(excludeFilePath)
      .toString();
    if (!excludeFileContent.includes(`${TOOL_NAME}rc.json`)) {
      await fs.appendFileSync(
        `${appRootPath.path}/.git/info/exclude`,
        `\n${TOOL_NAME}rc.json`
      );
    }

    // generate rc file
    nconf.set("notionProjectPageName", projectName);
    nconf.set("notionProjectPageId", notionProjectPageId);
    nconf.save((error: Error) => {
      if (error) this.error(error);
    });
  }
}
