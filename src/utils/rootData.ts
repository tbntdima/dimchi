import * as keytar from "keytar";
import * as nconf from "nconf";
import * as getCurrentGitBranch from "current-git-branch";

import { service, accountNotionSecret } from "../commands/init";
import { TOOL_NAME } from "../consts";

export const getNotionSecret = async (): Promise<string> => {
  const secret = await keytar.getPassword(service, accountNotionSecret);

  if (!secret) {
    throw new Error("Seems like tool is not initialized.");
  }

  return secret;
};

export const getProjectNotionDatabaseId = (): string => {
  nconf.file({ file: `./${TOOL_NAME}rc.json` });

  const projectNotionDatabaseId = nconf.get("projectNotionDatabaseId");

  if (!projectNotionDatabaseId) {
    throw new Error("Seems like the project is not added.");
  }

  return projectNotionDatabaseId;
};

export const getProjectNotionPageid = (): string => {
  nconf.file({ file: `./${TOOL_NAME}rc.json` });

  const projectNotionPageId = nconf.get("projectNotionPageId");

  if (!projectNotionPageId) {
    throw new Error("Seems like the project is not added.");
  }

  return projectNotionPageId;
};

export const getCurrentGitBranchName = (): string => {
  const gitBranchName = getCurrentGitBranch();
  if (!gitBranchName) {
    throw new Error("Not able to get git branch name");
  }
  return gitBranchName;
};

export function getNotionAppLink(pageId: string) {
  return `notion://notion.so/${pageId.split("-").join("")}`;
}
