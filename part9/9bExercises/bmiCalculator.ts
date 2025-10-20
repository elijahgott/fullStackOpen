interface BodyValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]) : BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

type BmiRange = 'underweight' | 'normal' | 'overweight' | 'obese'

const calculateBmi = (height: number, weight: number) : BmiRange => {
  const bmi = weight / ((height / 100) * (height / 100));

  if(bmi < 18.5){
    return 'underweight';
  }
  else if(bmi <= 24.9){
    return 'normal'
  }
  else if(bmi <= 29.9){
    return 'overweight';
  }
  else if(bmi >= 30){
    return 'obese';
  }
}

try{
  const { height, weight } = parseBmiArguments(process.argv);
  const bmiResult = calculateBmi(height, weight);
  console.log(bmiResult);
}
catch (error: unknown){
  let errorMessage = 'Oh no...';
  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}