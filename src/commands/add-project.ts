import { Command } from "@oclif/command";
import { Client } from "@notionhq/client";
import * as keytar from "keytar";
import * as repoName from "git-repo-name";

export default class AddProject extends Command {
  static description = "Add project";

  async run() {
    const notionSecret = await keytar.getPassword(
      "dimchi",
      "dimchi-notion-secret"
    );
    const notionRootPageId = await keytar.getPassword(
      "dimchi",
      "dimchi-notion-root-page-id"
    );

    const gitRepoName = repoName.sync();

    if (notionSecret && notionRootPageId) {
      const notion = new Client({
        auth: notionSecret,
      });

      const { results: rootPageChildren } = await notion.blocks.children.list({
        block_id: notionRootPageId,
      });

      const foundProjectsDatabase = rootPageChildren.find(
        (c) => c.type === "unsupported"
      );

      let databaseId;

      if (foundProjectsDatabase) {
        databaseId = foundProjectsDatabase.id;
      } else {
        const newDatabase = await notion.databases.create({
          parent: { page_id: notionRootPageId },
          title: [{ type: "text", text: { content: "PROJECTS" } }],
          properties: {
            Title: {
              title: {},
            },
            Page: {
              url: {},
            },
            PageId: {
              rich_text: {},
            },
            DatabaseId: {
              rich_text: {},
            },
          },
        });
        databaseId = newDatabase.id;
      }

      const {
        results: [project],
      } = await notion.databases.query({
        database_id: databaseId,
        filter: { property: "Title", text: { contains: gitRepoName } },
      });

      if (project) {
        this.log("Project already exists");
      } else {
        const projectPage = await notion.pages.create({
          parent: { page_id: notionRootPageId },
          properties: { title: [{ text: { content: gitRepoName } }] },
        });

        const projectPageRetived = await notion.pages.retrieve({
          page_id: projectPage.id,
        });

        const projectDatabase = await notion.databases.create({
          parent: { page_id: projectPage.id },
          title: [{ type: "text", text: { content: "PAGES" } }],
          properties: {
            Title: {
              title: {},
            },
            Page: {
              url: {},
            },
            PageId: {
              rich_text: {},
            },
          },
        });

        await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            Title: {
              title: [{ type: "text", text: { content: gitRepoName } }],
            },
            Page: {
              url: projectPageRetived.url,
            },
            PageId: {
              rich_text: [
                { type: "text", text: { content: projectPageRetived.id } },
              ],
            },
            DatabaseId: {
              rich_text: [
                { type: "text", text: { content: projectDatabase.id } },
              ],
            },
          },
        });
      }
    }
  }
}
