import { Client } from "@notionhq/client";
import * as keytar from "keytar";

export const getNotion = async (): Promise<Client> => {
  const notionSecret = await keytar.getPassword(
    "dimchi",
    "dimchi-notion-secret"
  );

  if (notionSecret) {
    const notion = new Client({
      auth: notionSecret,
    });

    return notion;
  } else {
    throw new Error("provide notion secret");
  }
};
