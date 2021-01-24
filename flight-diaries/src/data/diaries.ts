import { DiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

const data = [
  {
    id: 1,
    date: '2017-01-01',
    weather: 'rainy',
    visibility: 'poor',
    comment: "Pretty scary flight, I'm glad I'm alive",
  },
  {
    id: 2,
    date: '2017-04-01',
    weather: 'sunny',
    visibility: 'good',
    comment: "Everything went better than expected, I'm learning much",
  },
  {
    id: 3,
    date: '2017-04-15',
    weather: 'windy',
    visibility: 'good',
    comment: "I'm getting pretty confident although I hit a flock of birds",
  },
  {
    id: 4,
    date: '2017-05-11',
    weather: 'cloudy',
    visibility: 'good',
    comment: 'I almost failed the landing but I survived',
  },
];

/*
    As we are now using an enum to type the weather and visibility we 
    cannot just set the type the JSON data as Array<DiaryEntry>. This 
    is because an enum can be either a number or string so we cannot 
    assume the type of data it is -- the DiaryEntry interface expects 
    weather to be a string which matches one of the specified values. 

    To solve this issue we use the same toNewDiaryEntry function which 
    we defined in the utils file. As we know, this will parse all values 
    passed to it and ensure the completely match the interface we defined
    in the types file.
*/
const diaries: DiaryEntry[] = data.map((obj) => {
  // As the toNewDiaryEntry function returns an object
  // of the type NewDiaryEntry we use the 'as' keyword
  // to assert it to the type of DiaryEntry
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaries;
