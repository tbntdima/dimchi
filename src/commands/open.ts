import { Command, flags } from "@oclif/command";
import { Client } from "@notionhq/client";
import * as open from "open";
import * as keytar from "keytar";
import * as getCurrentGitBranch from "current-git-branch";
import * as repoName from "git-repo-name";

export default class Open extends Command {
  static description = "Open current task in notion";

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
    const gitBranch = getCurrentGitBranch();

    if (notionSecret && notionRootPageId && gitBranch) {
      const notion = new Client({
        auth: notionSecret,
      });

      const { results: rootPageChildren } = await notion.blocks.children.list({
        block_id: notionRootPageId,
      });

      const projectsDatabase = rootPageChildren.find(
        (c) => c.type === "unsupported"
      );

      if (projectsDatabase) {
        const {
          results: [project],
        } = await notion.databases.query({
          database_id: projectsDatabase.id,
          filter: { property: "Title", text: { contains: gitRepoName } },
        });

        // Check if page exists
        const projectDatabaseId =
          project.properties.DatabaseId.rich_text[0].plain_text;

        const projectId = project.properties.PageId.rich_text[0].plain_text;

        const {
          results: [task],
        } = await notion.databases.query({
          database_id: projectDatabaseId,
          filter: { property: "Title", text: { contains: gitBranch } },
        });

        if (task) {
          const retrievedTask = await notion.pages.retrieve({
            page_id: task.properties.PageId.rich_text[0].plain_text,
          });
          open(retrievedTask.url.replace("https", "notion"));
        } else {
          const taskPage = await notion.pages.create({
            parent: { page_id: projectId },
            properties: { title: [{ text: { content: gitBranch } }] },
          });

          const taskPageRetrived = await notion.pages.retrieve({
            page_id: taskPage.id,
          });

          await notion.pages.create({
            parent: { database_id: projectDatabaseId },
            properties: {
              Title: {
                title: [{ type: "text", text: { content: gitBranch } }],
              },
              Page: {
                url: taskPageRetrived.url,
              },
              PageId: {
                rich_text: [
                  { type: "text", text: { content: taskPageRetrived.id } },
                ],
              },
            },
          });

          open(taskPageRetrived.url.replace("https", "notion"));
        }

        // Create new page
      }
    } else {
      this.error("initialize first");
    }
  }
}
