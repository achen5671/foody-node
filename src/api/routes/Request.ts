export type JoinRequest = {
  name?: string;
  username: String;
  password: String;
  email?: String;
  smsNumber?: String;
};

export type FavoriteMealRequest = {
  name: String;
  calories: Number;
  nutrition: Object;
  prepTime: String;
  ingredients: [string];
  preparations: [string];
};
