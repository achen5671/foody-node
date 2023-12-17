import { CalculateCaloricIntakeRequest } from "../routes/Request";
import { BadRequestError } from "../middlewares/apiErrors";
import {
  ActivityFactor,
  ActivityLevel,
  CALORIES_PER_POUND,
  Sex,
  WeightType,
} from "../helpers/constants";

class LogicService {
  // Basal Metabolic Rate
  // using The Harris–Benedict equations revised by Roza and Shizgal in 1984.
  //   https://en.wikipedia.org/wiki/Harris–Benedict_equation
  // * age: years
  // * height: cm
  // * weight: kilogram
  calculateBMR = (request: CalculateCaloricIntakeRequest): number => {
    let { age, weight, height, sex, weightType } = request;

    if (weightType === WeightType.POUNDS) {
      weight = weight * 2.20462;
    }

    // formula uses number in kilogram
    if (sex === Sex.FEMALE) {
      return 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
    }

    if (sex === Sex.MALE) {
      return 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    }

    throw new BadRequestError("Invaid gender");
  };

  // Total Daily Energy Expenditure
  calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
    const activityFactor = ActivityFactor.get(activityLevel) as number;
    let TDEE: number = bmr * activityFactor;
    return TDEE;
  };

  calculateCaloricDeficitOrSurplus = (change: number, days: number) => {
    return (change * CALORIES_PER_POUND) / days;
  };
}

export default new LogicService();
