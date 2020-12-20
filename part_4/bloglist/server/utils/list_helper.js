const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0) / blogs.length;
};

const favoriteBlog = (blogs) => {
  const reducer = (output, current) => {
    output = current.likes > output.likes ? current : output;
    return output;
  };
  const favorite = blogs.reduce(reducer, blogs[0]);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = [];

  const reducer = (output, current) => {
    let authorObject = authors.find((obj) => obj.author === current.author);
    if (!authorObject || typeof authorObject === "undefined") {
      authorObject = { author: current.author, blogs: 1 };
      authors.push(authorObject);
    } else {
      authorObject.blogs += 1;
    }

    if ( typeof output === "undefined" ) {
      return output = authorObject;
    }

    if (output.blogs > current.blogs) {
      return output;
    } else {
      return (output = authorObject);
    }
  };

  const mostBlogs = blogs.reduce(reducer, authors[0]);

  return mostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
