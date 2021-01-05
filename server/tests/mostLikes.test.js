const mostLikes = require("../utils/list_helper").mostLikes;
const blogs = require("./blogs");

test("List with multiple entries", () => {
  const result = mostLikes(blogs);
  expect(result.author).toBe("Edsger W. Dijkstra");
  expect(result.likes).toBe(17);
});
