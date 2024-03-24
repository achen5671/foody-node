import { CalculateCaloricIntakeRequest } from "../routes/Request";
import { BadRequestError } from "../middlewares/apiErrors";
import {
  ActivityFactor,
  ActivityLevel,
  CALORIES_PER_POUND,
  Sex,
  WeightType,
} from "../helpers/constants";
import { poundsToKilogram } from "../helpers/utils";

class LogicService {
  // Basal Metabolic Rate
  // using The Harris–Benedict equations revised by Roza and Shizgal in 1984.
  //   https://en.wikipedia.org/wiki/Harris–Benedict_equation
  // default units
  // * age: years
  // * height: cm
  // * weight: pounds
  // NOTE: also look at
  // https: //www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf
  calculateBMR = (request: CalculateCaloricIntakeRequest): number => {
    let { age, weight, height, sex, weightType } = request;

    let weightInKilogram = weight;

    if (weightType === WeightType.POUNDS) {
      weightInKilogram = poundsToKilogram(weight);
    }

    if (sex === Sex.MALE) {
      return 13.7 * weightInKilogram + 5 * height - 6.8 * age + 66;
    }
    if (sex === Sex.FEMALE) {
      return 9.6 * weightInKilogram + 1.8 * height - 4.7 * age + 655;
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
