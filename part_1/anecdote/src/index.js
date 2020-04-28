import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>
      { text }
    </button>
  )
}

const Anecdote = ({anecdote, liked}) => (
  <div>
    <p>{anecdote}</p>
    <p>Liked {liked} times</p>
  </div>
);

const Heading = ({text}) => <h3>{text}</h3>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [likes, setLikes] = useState(anecdotes.map(anecdote => 0));

  const voteClickHandler = () => {
    const copy = [...likes];
      copy[selected] += 1;
      return setLikes(copy);
  };
  const anecdoteClickHandler = () => {
    const nextAnecdote = Math.floor( Math.random() * anecdotes.length);
    return nextAnecdote === selected ? anecdoteClickHandler() : setSelected(nextAnecdote);
  };
  const getMostLikedIndex = () => {
    let returnValue = 0;
    let max = likes[0];

    likes.forEach((like, i) => {
      if(like > max) {
        max = like;
        returnValue = i;
      }
    });

    return returnValue;
  }
  
  return (
    <div>
      <Heading text="Anecdote of the Day" />
      <Anecdote anecdote={anecdotes[selected]} liked={likes[selected]} />
      <Button clickHandler={anecdoteClickHandler} text="Random Anecdote" />
      <Button clickHandler={voteClickHandler} text="Like Anecdote" />
      <Heading text="Most Liked Anecdote" />
      <Anecdote anecdote={anecdotes[getMostLikedIndex()]} liked={likes[getMostLikedIndex()]} />
    </div>

  );

};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));