export type JoinRequest = {
  name?: string;
  username: String;
  password: String;
  email?: String;
  smsNumber?: String;
};

export type PatchSelfRequest = {
  name?: string;
  // password: String; in the future
  email?: String;
  weightGoal?: Number;
  currentWeight?: Number;
};

export type FavoriteMealRequest = {
  name: String;
  calories: Number;
  nutrition: Object;
  prepTime: String;
  ingredients: [string];
  preparations: [string];
};
