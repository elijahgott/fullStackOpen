import axios from 'axios';
import { useState } from "react";
import { createEntry } from '../services/diaryService';
import type { FormProps } from '../types';

const Form = ({ entries, setEntries }: FormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if(date && visibility && weather){
      const entryToAdd = {
        date,
        visibility,
        weather,
        comment: comment || null
      };
      createEntry(entryToAdd).then(data => {
        setEntries(entries.concat(data));
      }).catch(error => {
        console.error(error);

        if(axios.isAxiosError(error) && error.response){
          setErrorMessage(`${error.response.data}`);
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
        else{
          setErrorMessage('An unknown error has occurred.');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      })

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    }
  }

  return(
    <>
      <p style={{color: 'red'}}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={date} onChange={({target}) => {
            setDate(target.value)
          }
         } />
        <div>
          visibility:
          <input type="radio" name="visibility" onChange={() => setVisibility('great')} />great
          <input type="radio" name="visibility" onChange={() => setVisibility('good')} />good
          <input type="radio" name="visibility" onChange={() => setVisibility('ok')} />ok
          <input type="radio" name="visibility" onChange={() => setVisibility('poor')} />poor
        </div>
        <div>
          weather:
          <input type="radio" name="weather" onChange={() => setWeather('sunny')} />sunny
          <input type="radio" name="weather" onChange={() => setWeather('rainy')} />rainy
          <input type="radio" name="weather" onChange={() => setWeather('cloudy')} />cloudy
          <input type="radio" name="weather" onChange={() => setWeather('stormy')} />stormy
          <input type="radio" name="weather" onChange={() => setWeather('windy')} />windy
        </div>
        <input type="text" placeholder="comment" value={comment} onChange={({target}) => setComment(target.value)} />
        <button type="submit" >Add</button>
      </form>
    </>
  );
};

export default Form;