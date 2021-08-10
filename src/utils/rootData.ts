import * as keytar from "keytar";

import {
  service,
  accountNotionRootPageId,
  accountNotionRootDatabaseId,
} from "../commands/init";

export const getNotionRootPageId = async (): Promise<string> => {
  const notionRootPageId = await keytar.getPassword(
    service,
    accountNotionRootPageId
  );

  if (!notionRootPageId) {
    throw new Error("Tool is not initialized");
  }

  return notionRootPageId;
};

export const getNotionRootDatabaseId = async (): Promise<string> => {
  const notionRootDatabaseId = await keytar.getPassword(
    service,
    accountNotionRootDatabaseId
  );

  if (!notionRootDatabaseId) {
    throw new Error("Tool is not initialized");
  }

  return notionRootDatabaseId;
};
