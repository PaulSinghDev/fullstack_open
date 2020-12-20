const listHelper = require("../utils/list_helper");
const blogs = require("./blogs");

describe("Favorite Blog", () => {
  test("List with multiple entries", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result.title).toEqual("Canonical string reduction");
    expect(result.author).toEqual("Edsger W. Dijkstra");
    expect(result.likes).toEqual(12);
  });
});
