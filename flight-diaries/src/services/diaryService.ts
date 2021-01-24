import diaries from '../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => diaries;

// Use the alternate syntax to declare an array by specifying the
// population type and then an empty array at the end.
const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
  /**
   * It is important to remember that typing does NOT prevent the function
   * from returning unwanted fields, it simply ensures that the fields we
   * specify are of a certain type.
   *
   * With this in mind it is important to filter the sensitive fields
   * within the function which is responsible for returning the data.
   *
   * Not filtering in this case would mean that the sensitive information,
   * for example a password, would still be sent to the client. Typescript's
   * compiler would simply just not know about the field.
   */
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

/**
 * To add to our database we create a typed function which digests
 * an object in the shape of the NewDiaryEntry type -- which is a
 * DiaryEntry type that has the ID omitted -- the returns a
 * correctly typed object which follows the DiaryEntry schema
 *
 * @param entry
 */
const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

// We tell the function it is allowed to return undefined
// This is because we have no way of knowing if the ID
// provided will be in existence.
// In the event it is not we will handle what to do with
// the function which digests this.
const findById = (id: number): DiaryEntry | undefined =>
  diaries.find((d) => d.id === id);

export default {
  getEntries,
  addEntry,
  findById,
  getNonSensitiveDiaryEntries,
};
