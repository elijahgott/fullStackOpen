import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
    res.send({error: 'malformatted paramters'});
    return;
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  if(!req.body){
    res.send({error: 'paramters missing'});
  }
  
  if(!req.body.daily_exercises){
    res.send()
  }
  console.log(req.body.daily_exercises);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});