const destroyTestDb = async () => {
  const testDb = Bun.file("test.sqlite");
  if (await testDb.exists()) {
    await testDb.delete();
    console.log("testdb destroyed");
  }
};

destroyTestDb();
