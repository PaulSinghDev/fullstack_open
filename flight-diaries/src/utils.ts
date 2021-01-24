import { NewDiaryEntry, Weather, Visibility } from './types';

/**
 * In order to parse the data which is handed to the req.body and ensure
 * that it is digested in the right format we must create utility
 * functions which will parse the request body.
 *
 * It will go through each field of the object which is passed to it and then
 * use its helper functions to ensure that each field is of the right type and
 * if specified, value.
 *
 * The parse comment function is a type guarded one. It takes a variable 'comment'
 * and returns either an error or a string.
 *
 * It uses the type guard 'isString' to check that the variable is the correct type.
 *
 */

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error(`Incorrect or missing comment: ${comment}`);
  }
  return comment;
};

/**
 * The beneath function (isString) is what is considered a type guard function
 * It will return a boolean value which adheres to the type predicate.
 *
 * In this case the type predicate it 'text is string', the first word is the
 * name of the variable which we wish for this type predicate to be enforced on,
 * the word is is a specifier of how we want the variable to be assessed and the third
 * word is a type which we want to check against. If we had a function which took a
 * number called age we could type guard with 'age is number'
 *
 * The reason for checking the variable against both the typeof and instanceof
 * operators is that, in the unlikely event someone uses the new String() constructor
 * to make a string its type will be an object. Conversely a string which is created
 * using the normal const s = 'string' method would return false for instanceof.
 *
 * @param text
 */
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/**
 * As typescript does not have a native date type we cannot type guard
 * the isDate function as we did with isString above. Instead we will
 * use the native Date.parse() function to check whether the string which is
 * digested is actually a date string. The function will be wrapped in a
 * Boolean() function to return either true is a date object was successfully
 * created or false if not.
 *
 */
const isDate = (date: string): boolean => Boolean(Date.parse(date));

// Note that the function first parses the date variable as a string
// via using the isString function. this is what allows us to send the
// variable to the isDate function -- which expects a string to be passed
// passed to it. Without first checking the date is a string we could send
// data of an incorrect type to the isDate function.

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

// We use the enum of the Weather type (types.ts) to check whether the
// value passed matches one of our predefined values. We have to set
// the type of the str variable to any as it will not compile via the
// includes method otherwise. This enables the function to be more
// reusable and provides us confidence that we know we will be able
// successfully determine whether the weather is correct.
const isWeather = (str: any): str is Weather => {
  return Object.values(Weather).includes(str);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error(`Error incorrect or missing weather: ${weather}`);
  }
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error(`Error missing or invalid visibility: ${visibility}`);
  }
  return visibility;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment),
  };
  return newEntry;
};

export default toNewDiaryEntry;
