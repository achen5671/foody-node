export enum OpenAIPrompt {
  SUGGEST_MEAL = "Generate 5 recipe using the following ingredients: ",
}
export enum MealType {
  BREAKSFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  SNACK = "Snack",
  BRUNCH = "Brunch",
  LINNER = "Linner",
}

export enum ActivityLevel {
  SEDENTARY = "Sedendary",
  LIGHTLY = "Lightly",
  MODERATE = "Moderate",
  VERY = "Very",
  EXTRA = "Extra",
}

export const ActivityFactor: Map<ActivityLevel, number> = new Map([
  [ActivityLevel.SEDENTARY, 1.2],
  [ActivityLevel.LIGHTLY, 1.375],
  [ActivityLevel.MODERATE, 1.55],
  [ActivityLevel.VERY, 1.725],
  [ActivityLevel.EXTRA, 1.9],
]);

export enum Sex {
  MALE = "male",
  FEMALE = "female",
}

export enum WeightType {
  POUNDS = "pounds",
  KILOGRAM = "kilogram",
}

export const CALORIES_PER_POUND = 3500;

export const PROJECTED_INTERVAL_IN_MONTHS = 6;

export const WEEKS_PER_MONTH = 4.34525;

export enum Fitness {
  GAIN = "gain",
  LOSE = "lose",
}
