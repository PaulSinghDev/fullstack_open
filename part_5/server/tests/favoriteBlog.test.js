const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const blogs = require("./blogs");

test("List with multiple entries", () => {
  const result = favoriteBlog(blogs);
  expect(result.title).toEqual("Canonical string reduction");
  expect(result.author).toEqual("Edsger W. Dijkstra");
  expect(result.likes).toEqual(12);
});
