import { Command } from "@oclif/command";
import * as keytar from "keytar";

export default class Destroy extends Command {
  static description = "Clean up config";

  async run() {
    await keytar.deletePassword("dimchi", "dimchi-notion-secret");
    await keytar.deletePassword("dimchi", "dimchi-notion-root-page-id");

    console.log("Instance has been destroyed");
  }
}
