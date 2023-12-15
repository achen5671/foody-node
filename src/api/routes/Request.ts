export type JoinRequest = {
  name?: string;
  username: String;
  password: String;
  email?: String;
  smsNumber?: String;
};

export type FavoriteMealRequest = {
  name: string;
  ingredients: string[];
  preparation: string[];
  calories: number;
  nutrition: Object;
};
