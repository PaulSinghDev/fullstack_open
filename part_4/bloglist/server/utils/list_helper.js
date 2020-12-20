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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
