import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
const getTestDb = () => {
  const sqlite = new Database("test.sqlite");
  const db = drizzle(sqlite);
  return db;
};
export default getTestDb;
