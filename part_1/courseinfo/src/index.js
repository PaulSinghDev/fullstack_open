import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
);

const Content = (props) => (
  <>
    <Part part={props.parts.part1} exercise={props.exercises.exercise1} />
    <Part part={props.parts.part2} exercise={props.exercises.exercise2} />
    <Part part={props.parts.part3} exercise={props.exercises.exercise3} />
  </>
);

const Total = (props) => (
  <p>
    Number of exercises {props.total}
  </p>
);

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercise1 = 10;
  const part2 = 'Using props to pass data';
  const exercise2 = 7;
  const part3 = 'State of a component';
  const exercise3 = 14;

  return (
    <div>
      <Header course={ course } />
      <Content parts={ { part1, part2, part3 } } exercises= { {exercise1, exercise2, exercise3 } } />
      <Total total={ exercise1 + exercise2 + exercise3 } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));