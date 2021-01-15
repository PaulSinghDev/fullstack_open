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
    // Check if the author's object is already present in the author array
    let authorObject = authors.find((obj) => obj.author === current.author);

    // If it isn't then create an object and set the number of blogs to 1
    if (!authorObject || typeof authorObject === "undefined") {
      authorObject = { author: current.author, blogs: 1 };
      authors.push(authorObject);
      // Otherwise increment the current author's blog count
    } else {
      authorObject.blogs += 1;
    }

    // If output is not defined we are on the first author so set that
    // to the output
    if (typeof output === "undefined") {
      return (output = authorObject);
    }

    // Otherwise check if the current Author has more blogs than the
    // The one which is set as the output.  If so replace it, otherwise
    // return current output.
    if (output.blogs > current.blogs) {
      return output;
    } else {
      return (output = authorObject);
    }
  };

  const mostBlogs = blogs.reduce(reducer, authors[0]);

  return mostBlogs;
};

const mostLikes = (blogs) => {
  const authors = [];

  const reducer = (output, current) => {
    // Check if the current author is present in the author array
    let authorObject = authors.find((obj) => obj.author === current.author);

    // Create object if it doesn't exist already
    if (!authorObject || typeof authorObject === "undefined") {
      authorObject = { author: current.author, likes: current.likes };
      authors.push(authorObject);
    } else {
      // Add the current likes to the author object if it exists
      authorObject.likes += current.likes;
    }

    // Set output to current author object if it is undefined
    if (typeof output === "undefined") {
      return (output = authorObject);
    } else if (output.likes > current.likes) {
      return output;
    } else {
      return (output = authorObject);
    }
  };

  const mostLikes = blogs.reduce(reducer, authors[0]);

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
