import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = (props) => (
  <h1>{props.title}</h1>
);

const Heading = (props) => (
  <h2>{props.heading}</h2>
);

const Button = (props) => (
  <button onClick={props.clickHandler}>
    {props.text}
  </button>
);

const Statistic = ({name, value}) => (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
);

const Statistics = ({good, neutral, bad, total}) => {
  
  if(total === 0) {
    return (
    <>
      <Heading heading="Statistics" />
      <p>No feedback provided</p>
    </>
    );
  }
  
  const getPercentage = value => `${((value / total) * 100).toFixed(4)}%`;

  return (
    <>
      <Heading heading="Statistics" />
      <table>
        <tbody>
          <Statistic name="Good:" value={good}/>
          <Statistic name="Neutral:" value={neutral}/>
          <Statistic name="Bad:" value={bad}/>
          <Statistic name="Total Received:" value={total} />
          <Statistic name="Average Positive:" value={getPercentage(good)} />
          <Statistic name="Average Neutral:" value={getPercentage(neutral)} />
          <Statistic name="Average Bad:" value={getPercentage(bad)} />
        </tbody>
      </table>
    </>
  );
}

const App = () => {

  // Make our initial Statistics ad a setter for them.
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const clickHandler = (feedback) => {
    switch(feedback) {
      case 'good':
        return () => {
          setGood(good + 1);
          setTotal(total + 1);
        };
      case 'neutral':
        return () => {
          setNeutral(neutral + 1);
          setTotal(total + 1);
        };
      case 'bad':
        return () => {
          setBad(bad +1);
          setTotal(total + 1);
        };
      default:
        break;
    }
  };

  return (
    <>
      <Title title="Uni Cafe Feedback" />
      <div>
        <Heading heading="Give Feedback" />
        <Button clickHandler={clickHandler('good')} text="Good"/>
        <Button clickHandler={clickHandler('neutral')} text="Neutral"/>
        <Button clickHandler={clickHandler('bad')} text="Bad"/>
      </div>
      <div>
        <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));