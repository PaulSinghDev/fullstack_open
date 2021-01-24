/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Gender, NewPatientObject } from '../types';

const isString = (str: any): str is string =>
  typeof str === 'string' || str instanceof String;

const parseName = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Error, no name provided or incorrect type: ${text}`);
  }
  return text;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Error, date either missing or incorrect: ${date}`);
  }
  return date;
};

const parseSsn = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Error, SSN either missing or incorrect: ${text}`);
  }
  return text;
};

const parseOccupation = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Error, occupation either missing or incorrect: ${text}`);
  }
  return text;
};

const isGender = (str: any): str is Gender =>
  Object.values(Gender).includes(str);

const parseGender = (text: any): Gender => {
  if (!isGender(text)) {
    throw new Error(`Error, gender either missing or invalid: ${text}`);
  }
  return text;
};

const toNewPatient = (object: any): NewPatientObject => {
  const newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

export default toNewPatient;
