import { Command, flags } from "@oclif/command";
import * as inquirer from "inquirer";
import * as keytar from "keytar";

import { TOOL_NAME } from "../consts";

export const service = TOOL_NAME;
export const accountNotionSecret = `${TOOL_NAME}-notion-secret`;

export default class Init extends Command {
  static description = "Init config";

  static flags = {
    update: flags.boolean({ char: "u" }),
    destroy: flags.boolean({ char: "d" }),
  };

  async run() {
    const { flags } = this.parse(Init);

    // Destroy
    if (flags.destroy) {
      await keytar.deletePassword(service, accountNotionSecret);

      this.log("Tool has been uninitialized.");

      return;
    }

    // Create/update
    const notionSecret = await keytar.getPassword(service, accountNotionSecret);
    if (!notionSecret || flags.update) {
      const { notionSecretInput } = await inquirer.prompt([
        {
          type: "password",
          name: "notionSecretInput",
          message: "Notion secret:",
        },
      ]);

      try {
        await keytar.setPassword(
          service,
          accountNotionSecret,
          notionSecretInput
        );

        this.log(
          flags.update
            ? "Tool initialization has been updated."
            : `Tool has been successfully initialized 🚀\nYou are ready to add a project.\nTry "${TOOL_NAME} add-project" command.`
        );
      } catch (e) {
        this.log(e);
      }

      return;
    }

    this.log("Tool is already set up.");
  }
}
