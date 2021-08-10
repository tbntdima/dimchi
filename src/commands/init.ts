import { Command, flags } from "@oclif/command";
import * as inquirer from "inquirer";
import * as keytar from "keytar";
import * as chalk from "chalk";
import { Client } from "@notionhq/client";

import { TOOL_NAME } from "../consts";

export const service = TOOL_NAME;
export const accountNotionSecret = `${TOOL_NAME}-notion-secret`;
export const accountNotionRootPageId = `${TOOL_NAME}-notion-root-page-id`;
export const accountNotionRootDatabaseId = `${TOOL_NAME}-notion-root-database-id`;
export default class Init extends Command {
  static description = "Init config";

  static flags = {
    update: flags.boolean({ char: "u" }),
    destroy: flags.boolean({ char: "d" }),
  };

  async run() {
    const { flags } = this.parse(Init);

    const notionSecret = await keytar.getPassword(service, accountNotionSecret);

    if (flags.destroy) {
      await keytar.deletePassword(service, accountNotionSecret);
      await keytar.deletePassword(service, accountNotionRootPageId);
      await keytar.deletePassword(service, accountNotionRootDatabaseId);

      this.log(chalk.green("Tool has been uninitialized successfully."));

      return;
    }

    if (!notionSecret || flags.update) {
      const { notionSecretInput, notionRootPageId } = await inquirer.prompt([
        {
          type: "password",
          name: "notionSecretInput",
          message: "Notion secret:",
        },
        {
          type: "password",
          name: "notionRootPageId",
          message: "Notion root page id:",
        },
      ]);

      try {
        await keytar.setPassword(
          service,
          accountNotionSecret,
          notionSecretInput
        );

        await keytar.setPassword(
          service,
          accountNotionRootPageId,
          notionRootPageId
        );

        // check is database is created
        const keytarNotionRootDatabaseId = await keytar.getPassword(
          service,
          accountNotionRootDatabaseId
        );
        // create database
        if (!keytarNotionRootDatabaseId) {
          const notion = new Client({
            auth: notionSecretInput,
          });

          const { id: notionRootDatabaseId } = await notion.databases.create({
            parent: { page_id: notionRootPageId },
            title: [{ type: "text", text: { content: "_database" } }],
            properties: {
              Test: {
                title: {},
              },
            },
          });

          await keytar.setPassword(
            service,
            accountNotionRootDatabaseId,
            notionRootDatabaseId
          );
        }

        this.log(
          chalk.green(
            flags.update
              ? "Configuration has been updated."
              : `Tool has been successfully initialized 🚀\nYou are ready to add a project.\nTry "${TOOL_NAME} add-project" command.`
          )
        );
      } catch (e) {
        this.log(chalk.red(e));
      }

      return;
    }

    this.log("Tool is already set up.");
  }
}
