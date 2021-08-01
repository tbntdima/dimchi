import { Command, flags } from "@oclif/command";
import * as inquirer from "inquirer";
import * as keytar from "keytar";

export default class Init extends Command {
  static description = "Init config";

  static flags = {
    update: flags.boolean({ char: "u" }),
  };

  async run() {
    const { flags } = this.parse(Init);

    const notionSecret = await keytar.getPassword(
      "dimchi",
      "dimchi-notion-secret"
    );

    const notionRootPageId = await keytar.getPassword(
      "dimchi",
      "dimchi-notion-root-page-id"
    );

    if (!notionSecret || !notionRootPageId || flags.update) {
      const { notionSecretInput, notionRootPageId } = await inquirer.prompt([
        {
          type: "input",
          name: "notionSecretInput",
          message: "Notion secret:",
        },
        {
          type: "input",
          name: "notionRootPageId",
        },
      ]);

      await keytar.setPassword(
        "dimchi",
        "dimchi-notion-secret",
        notionSecretInput
      );

      await keytar.setPassword(
        "dimchi",
        "dimchi-notion-root-page-id",
        notionRootPageId
      );

      this.log(
        flags.update
          ? "Set up has been updated"
          : "Set up has been completed 🚀"
      );
    } else {
      this.log("You already set up!");
    }
  }
}
