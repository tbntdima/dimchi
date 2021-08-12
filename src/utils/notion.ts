import { Client } from "@notionhq/client";
import * as keytar from "keytar";

import { getNotionSecret } from "./rootData";

export const getNotion = async (): Promise<Client> => {
  const notionSecret = await getNotionSecret();

  if (notionSecret) {
    const notion = new Client({
      auth: notionSecret,
    });

    return notion;
  } else {
    throw new Error("provide notion secret");
  }
};
