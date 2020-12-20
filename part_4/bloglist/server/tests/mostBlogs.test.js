const listHelper = require('../utils/list_helper');
const blogs = require("./blogs");

describe("Most Blogs", () => {
    const result = listHelper.mostBlogs(blogs);

    test("With ful list", () => {
        expect(result.author).toBe("Robert C. Martin");
        expect(result.blogs).toBe(3);
    });
});