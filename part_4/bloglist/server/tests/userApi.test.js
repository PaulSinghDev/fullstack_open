const helper = require("./testHelper");
const app = require("../app");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");

describe("user tests", () => {
  beforeEach(async () => {
    await helper.dbConnect();
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pass", 10);
    const user = {
      username: "root",
      name: "Super User",
      passwordHash,
    };
    await new User(user).save();
  });

  test("add one user", async () => {
    const usersBefore = await helper.usersInDb();
    const passwordHash = await bcrypt.hash("pass", 10);
    const user = { username: "noob", name: "New B", passwordHash };
    await new User(user).save();
    const usersAfter = await helper.usersInDb();
    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(user.username);
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
  });
});

afterEach(async () => await helper.dbClose());
