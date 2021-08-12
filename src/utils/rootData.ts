import * as keytar from "keytar";

import { service, accountNotionSecret } from "../commands/init";

export const getNotionSecret = async (): Promise<string> => {
  const secret = await keytar.getPassword(service, accountNotionSecret);

  if (!secret) {
    throw new Error("Seems like tool is not initialized.");
  }

  return secret;
};
