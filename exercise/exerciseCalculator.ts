interface CalculateExercisesArguments {
  hours: Array<number>;
  target: number;
}

interface CalculateExercises {
  days: number;
  days_trained: number;
  original_target: number;
  average_time: number;
  target_met: boolean;
  rating: number;
  explanation: string;
}

const parseArguments = (args: Array<string>): CalculateExercisesArguments => {
  if (args.length < 5)
    throw new Error('You need to provide at least three arguments');

  args.forEach((a, i) => {
    if (i < 2) return;
    if (isNaN(Number(a)))
      throw new Error('All arguments provided must be numbers');
  });

  const target = Number(args[2]);
  const hours = args.reduce((op, curr, i) => {
    if (i < 3) return op;

    op.push(Number(curr));
    return op;
  }, [] as number[]);
  return {
    hours: hours,
    target: target,
  };
};

export const calculateExercises = (
  target: number,
  exerciseHours: Array<number>
): CalculateExercises => {
  const totalDays = exerciseHours.length;
  const daysTrained = exerciseHours.filter((d) => d !== 0).length;
  const totalHours = exerciseHours.reduce((total, day) => total + day);
  const average = totalHours / totalDays;
  const targetMet = average >= target;
  const rating = targetMet ? 3 : target - average < 1 ? 2 : 1;
  const ratingDescription =
    rating === 3 ? 'Great job' : rating === 2 ? 'Not bad' : 'Need improvement';
  return {
    days: totalDays,
    days_trained: daysTrained,
    original_target: target,
    average_time: average,
    target_met: targetMet,
    rating: rating,
    explanation: ratingDescription,
  };
};

try {
  if (process.argv.length > 2) {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(target, hours));
  }
} catch (error) {
  console.log(`There was an error: ${error.message}`); // eslint-disable-line
}
