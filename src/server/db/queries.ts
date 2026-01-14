import type { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema";
import { getDb } from "./db";
export const insertSubscriber = async (
  d1Database: D1Database,
  newSubscriber: schema.NewSubscriber,
) => {
  const db = getDb(d1Database);
  try {
    const [result] = await db
      .insert(schema.subscribers)
      .values(newSubscriber)
      .returning();
    return result;
  } catch (error) {
    throw new Error("Failed to insert subscriber: " + (error as Error).message);
  }
};
