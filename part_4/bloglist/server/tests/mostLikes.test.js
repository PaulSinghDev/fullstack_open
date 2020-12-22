const listHelper = require("../utils/list_helper");
const blogs = require("./blogs");

describe("Most Likes", () => {
  const result = listHelper.mostLikes(blogs);

  test("List with multiple entries", () => {
    expect(result.author).toBe("Edsger W. Dijkstra");
    expect(result.likes).toBe(17);
  });
});
