import { beforeEach, expect, it, mock } from "bun:test";
import { insertSubscriber } from "./queries";
import { D1Database } from "@cloudflare/workers-types";
import type { NewSubscriber } from "./schema";
import getTestDb from "../../../test/get-test-db";
import { reset } from "drizzle-seed";
import * as schema from "./schema";

mock.module("./db.ts", () => {
  return {
    getDb: () => getTestDb(),
  };
});

beforeEach(async () => {
  const db = getTestDb();
  await reset(db, schema);
});

it("insert new subscriber", async () => {
  // test implementation goes here
  const newSubscriber: NewSubscriber = {
    email: "test@test.com",
  };
  const subscriber = await insertSubscriber({} as D1Database, newSubscriber);
  expect(subscriber.email).toBe(newSubscriber.email);
  expect(subscriber.id).toBeDefined();
  expect(subscriber.createdAt).toBeDefined();
});

it("throw error when inserting duplicate email", async () => {
  const newSubscriber: NewSubscriber = {
    email: "test@test.com",
  };
  await insertSubscriber({} as D1Database, newSubscriber);
  try {
    const res = await insertSubscriber({} as D1Database, newSubscriber);
  } catch (error) {
    error instanceof Error &&
      expect(error.message).toContain("Failed to insert subscriber");
    return;
  }
});

it("chack valid email insertion", async () => {
  const invalidSubscriber: NewSubscriber = {
    email: "invalid-email",
  };
  try {
    await insertSubscriber({} as D1Database, invalidSubscriber);
  } catch (error) {
    error instanceof Error &&
      expect(error.message).toContain("Failed to insert subscriber");
    return;
  }
});
