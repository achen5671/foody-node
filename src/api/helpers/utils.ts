import moment from "moment";

export const today = moment().startOf("day").toDate(); // Start of the day
export const tomorrow = moment(today).add(1, "day").toDate(); // Start of tomorrow

export const getAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  // Get the current date
  const currentDate = new Date();
  // Calculate the difference in years between the current date and the birthday
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  // Check if the current date is before the birthday this year
  // If so, subtract 1 from the age because the birthday hasn't occurred yet
  const isBeforeBirthday =
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate());
  if (isBeforeBirthday) {
    age--;
  }
  return age;
};

export const poundsToKilogram = (pound: number) => {
  return pound * 0.453592;
};
