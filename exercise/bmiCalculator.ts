interface CalculateBmiArgs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): CalculateBmiArgs => {
  if (args.length < 4)
    throw new Error('You need to provide your height and weight');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
    throw new Error('Both arguments must be numbers');
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi >= 15 && bmi < 16:
      return 'Severely underweight';
    case bmi >= 16 && bmi < 18.5:
      return 'Underweight';
    case bmi >= 18.5 && bmi < 25:
      return 'Normal (healthy weight)';
    case bmi >= 25 && bmi < 30:
      return 'Overweight';
    case bmi >= 30 && bmi < 35:
      return 'Obese Class I (Moderately obese)';
    case bmi >= 35 && bmi < 40:
      return 'Obese Class II (Severely obese)';
    case bmi > 40:
      return 'Obese Class III (Very severely obese)';
    default:
      throw new Error('Invalid result');
  }
};

try {
  if (process.argv.length > 2) {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (err) {
  console.log(`There has been an error: ${err.message}`); // eslint-disable-line
}
