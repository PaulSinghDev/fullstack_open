/*
    In order to reuse the data in the Weather type we will use the enum 
    feature of typescript. This allows us to reuse the fields of the 
    type and read their values in both pre compile and runtime. 
    
    For example, if at runtime we need to check an input value to ensure
    it matches a specific set of pre defined values, we can use Object.Values
    and pass it the enum. 

    In our case we want to check whether the flight diary input matches the 
    data we predefined for the weather. We would execute: 
    Object.values(Weather).includes(valueToCheck)
*/
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy',
}

// Create a type to be used in the interface below
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

// Define an interface (somewhat like the skeleton of an object)
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  // Adding a ? means the field is conditional
  comment?: string;
}

/**
 * In the event we want to omit specific fields from our type
 * we can do so one of multiple ways.
 */

// Method 1 -- The longest and worst looking
// Declare an Array, then use the Pick utility type
// and select id, weather dat and visibility from the
// DiaryEntry interface above
/*
 const getSelectedFields = (): Array<Pick<DiaryEntry, 'id' | 'date'|'weather'|'visibility'>> => {
    ...
 }
 */

/**
 * Method 2 same principle but use the alternate method of declaring a
 * typed variable array: type[]
 */
/*
  const getSelectedFields = (): Pick<DiaryEntry, 'id'|'date'|'weather'|'visibility'>[] => {
      ...
  }
  */

/**
 * Method 3 -- optimal for this case
 * use the Omit utility type and simply exclude the fields we wish to
 * keep private.
 *
 * We will put this into its own type which can be exported and then reused.
 * The syntax is similar to method two above: UtilityType<TypeToFilter, 'variable_to_filter_out'>
 */

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

/**
 * In order to improve readability of the new diary function we create a new
 * type which defines the same diary entry but without the ID field. This is
 * because we do not know what the ID will be before it has been made by the
 * function which will be digesting the type.
 */
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
