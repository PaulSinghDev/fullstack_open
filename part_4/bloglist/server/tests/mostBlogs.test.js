const mostBlogs = require("../utils/list_helper").mostBlogs;
const blogs = require("./blogs");

test("With full list", () => {
  const result = mostBlogs(blogs);
  expect(result.author).toBe("Robert C. Martin");
  expect(result.blogs).toBe(3);
});
