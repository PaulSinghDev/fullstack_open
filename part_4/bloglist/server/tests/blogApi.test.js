const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./testHelper");
const Blog = require("../models/Blog");

/**
 * Create an api variable to test the app's
 * api routes.
 */
const api = supertest(app);

/**
 * Initialise the database;
 */
beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe("get tests", () => {
  test("response is json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("has id field", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
  test("has all blogs", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length);
  });
  test("invalid id", async () => {
    const id = await helper.nonExistingId();
    await api.get(`/api/blogs/${id}`).expect(404);
  });
  test("blog by id", async () => {
    const initialBlog = (await helper.blogsInDb())[0];

    const blog = await api
      .get(`/api/blogs/${initialBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
      expect(blog.body).toEqual(initialBlog);
  });

});

describe("post tests", () => {
  test("can post", async () => {
    const newBlog = {
      title: "A Blog From Jest",
      author: "Jest",
      likes: 2,
      url: "https://makingstuffs.co.uk",
    };

    await api.post("/api/blogs").send(newBlog);

    const blogs = (await helper.blogsInDb()).map((blog) => blog.title);
    expect(blogs.length).toEqual(helper.initialBlogs.length + 1);
    expect(blogs).toContain("A Blog From Jest");
  });

  test("default likes", async () => {
    const newBlog = {
      title: "A Blog From Jest",
      author: "Jest",
      url: "https://makingstuffs.co.uk",
    };

    const result = (
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    ).body;

    expect(result.likes).toBe(0);
  });

  test("no title", async () => {
    const newBlog = {
      author: "Jest",
      likes: 2,
      url: "https://makingstuffs.co.uk",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("no author", async () => {
    const newBlog = {
      title: "A Blog from Jest",
      likes: 2,
      url: "https://makingstuffs.co.uk",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("no url", async () => {
    const newBlog = {
      title: "A Blog from Jest",
      author: "Jest",
      likes: 2,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("delete tests", () => {
  test("no id to delete", async () => {
    await api.delete("/api/blogs/").expect(404);
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length);
  });

  test("delete one", async () => {
    await api.delete(`/api/blogs/${helper.initialBlogs[0]._id}`).expect(200);
    const blogs = await helper.blogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length - 1);
  });
});

describe("put tests", () => {
  test("no id", async () => {
    await api.put(`/api/blogs/`).expect(404);
  });
  test("no body", async () => {
    const id = helper.initialBlogs[0]._id;

    const response = await api
      .put(`/api/blogs/${id}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toMatch("Nothing to update");
  });
  test("invalid fields", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      wrong: "field",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toMatch("Nothing to update");
  });
  test("mixed validity", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      title: "A New Title",
      wrong: "Field",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toMatch(obj.title);
    expect(response.body.wrong).not.toBeDefined();
  });
  test("multiple fields", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      title: "A New Title",
      author: "A New Author",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toMatch(obj.title);
    expect(response.body.author).toMatch(obj.author);
  });
  test("update title", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      title: "A New Title",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toMatch(obj.title);
  });
  test("update author", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      author: "New Author",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.author).toMatch(obj.author);
  });
  test("update likes", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      likes: 0,
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toEqual(obj.likes);
  });
  test("update url", async () => {
    const id = helper.initialBlogs[0]._id;
    const obj = {
      url: "https://makingstuffs.co.uk",
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(obj)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.url).toMatch(obj.url);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
