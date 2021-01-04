const helper = require("./testHelper");
const app = require("../app");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  jest.setTimeout(30000);

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

afterEach(async () => {
  await helper.dbClose();
});

describe("user db tests", () => {
  test("add one user", async () => {
    const usersBefore = await helper.usersInDb();
    const passwordHash = await bcrypt.hash("pass", 10);
    const user = { username: "bob", name: "New B", passwordHash };
    const savedUser = await new User(user).save();
    const usersAfter = await helper.usersInDb();
    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(user.username);
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
  });
});

describe("user api tests", () => {
  test("add one user", async () => {
    const usersBefore = await helper.usersInDb();
    const user = { username: "fred", name: "Fred B", password: "pass" };
    await api
      .post("/api/users")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const usersAfter = await helper.usersInDb();
    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(user.username);
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
  });

  test("no username", async () => {
    const usersAtTheStart = await helper.usersInDb();
    const user = {
      password: "pass",
      name: "No Username",
    };
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersAtTheStart.length);
    expect(response.body.error).toBeDefined();
  });

  test("no password", async () => {
    const usersAtTheStart = await helper.usersInDb();
    const user = {
      username: "nopass",
      name: "No Username",
    };
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersAtTheStart.length);
    expect(response.body.error).toBeDefined();
  });

  test("duplicate user", async () => {
    const usersAtTheStart = await helper.usersInDb();
    const user = {
      username: "root",
      password: "pass",
      name: "Duplicate Username",
    };
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersAtTheStart.length);
    expect(response.body.error).toBeDefined();
  });
});
