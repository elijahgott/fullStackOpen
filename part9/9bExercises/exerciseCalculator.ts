interface Inputs {
  target: number;
  exercises: number[];
}

const parseExerciseArguments = (args: string[]) : Inputs => {
  if(args.length < 4) throw new Error('Not enough arguments!');
  let target;
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  }
  else {
    throw new Error('Provided values were not numbers!');
  }

  let exercises = [];
  for(let i = 3; i < args.length; i++){
    if(!isNaN(Number(args[i]))){
      exercises.push(Number(args[i]));
    }
    else{
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    target,
    exercises
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (target: number, exercises: number[]) : Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(e => e > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target ? true : false;
  let rating;
  let ratingDescription;
  if(average < 1){
    rating = 1;
    ratingDescription = 'You are a lazy MF.'
  }
  else if(average < 2){
    rating = 2;
    ratingDescription = 'This is lowkey pretty solid.'
  }
  else if(average >= 2){
    rating = 3;
    ratingDescription = 'Holy moly!! Goated!'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try{
  const { target, exercises } = parseExerciseArguments(process.argv);
  const exercisesResult = calculateExercises(target, exercises);
  console.log(exercisesResult);
}
catch (error: unknown){
  let errorMessage = 'Oh no...';
  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}