import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.exercise}</p>
);

const Content = (props) => (
  <>
    <Part name={props.parts.part1.name} exercise={props.parts.part1.exercise} />
    <Part name={props.parts.part2.name} exercise={props.parts.part2.exercise} />
    <Part name={props.parts.part3.name} exercise={props.parts.part3.exercise} />
  </>
);

const Total = (props) => (
  <p>
    Number of exercises {props.total}
  </p>
);

const App = () => {
  const course = 'Half Stack application development';
  const part1 = { 
    name: 'Fundamentals of React',
    exercise: 10 
  };
  const part2 = {
    name: 'Using props to pass data',
    exercise: 7
  };
  const part3 = {
    name: 'State of a component',
    exercise: 14
  };

  return (
    <div>
      <Header course={ course } />
      <Content parts={ { part1, part2, part3 } } />
      <Total total={ part1.exercise + part2.exercise + part3.exercise } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));