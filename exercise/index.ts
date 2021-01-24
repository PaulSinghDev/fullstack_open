import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height; // eslint-disable-line
  const weight = req.query.weight; // eslint-disable-line

  if (!height || !weight) {
    res.status(400).json({ error: 'Both height and weight should be defined' });
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'Height and weight should be numbers' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  res.json({
    height,
    weight,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const hours = req.body.hours; // eslint-disable-line
  const target = Number(req.body.target); // eslint-disable-line
  if (isNaN(target))
    return res.status(400).json({ error: 'Target should be a number ' });

  for (const hour of hours) {
    if (isNaN(hour))
      return res
        .status(400)
        .json({ error: 'Hours should be an array of numbers' });
  }

  const response = calculateExercises(target, hours);
  return res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server connected to port: ${PORT}`);
});
