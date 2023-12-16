import { MealType } from "../helpers/constants";

export type JoinRequest = {
  name?: string;
  username: string;
  password: string;
  email?: string;
  smsNumber?: string;
};

export type PatchSelfRequest = {
  name?: string;
  // password: string; in the future
  email?: string;
  weightGoal?: number;
  currentWeight?: number;
};

type Nutrition = {
  protein: number;
  fiber: number;
  fat: number;
};

export type FavoriteMealRequest = {
  name: string;
  calories: number;
  nutrition: Nutrition;
  prepTime: string;
  ingredients: [string];
  preparations: [string];
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
