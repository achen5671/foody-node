import moment from "moment";

export const today = moment().startOf("day").toDate(); // Start of the day
export const tomorrow = moment(today).add(1, "day").toDate(); // Start of tomorrow
