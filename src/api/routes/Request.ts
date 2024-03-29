import {
  ActivityLevel,
  Fitness,
  MealType,
  Sex,
  WeightType,
} from "../helpers/constants";

export type JoinRequest = {
  name: string;
  username: string;
  password: string;
  email: string;
  smsNumber?: string;
};

export type PatchSelfRequest = {
  name?: string;
  // password: string; in the future
  email?: string;
  weightGoal?: number;
  weight?: number;
  dailyTDEE?: number;
  profilePictureUrl?: string;
  profileBannerUrl?: string;
};

type Nutrition = {
  protein: number;
  fiber: number;
  fat: number;
};

export type FavoriteMealRequest = {
  recipe_name: string;
  calories: number;
  nutrition: Nutrition;
  prepTime?: string;
  ingredients?: [string];
  preparations?: [string];
};

export type WeightProgressRequest = {
  date: string; // use timestamp?
  weight: number;
};

export type InsertMealRequest = {
  name: string;
  date: string;
  calories: number;
  type: MealType;
};

export type CalculateCaloricIntakeRequest = {
  weight: number;
  height: number;
  age: number;
  sex: Sex;
  weightType: WeightType;
  activityLevel: ActivityLevel;
  fitnessType: Fitness;
  weightToLoseEveryWeek: number;
};

export type LoginRequest = {
  username: string;
  password: string;
};
