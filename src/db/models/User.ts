import mongoose, { Types, Document } from "mongoose";
import { BaseModel } from "./BaseModel";
import { ObjectId } from "mongodb";
import { Sex } from "../../api/helpers/constants";

// NOTE:
//  favoriteMeals per user should be relatively small, but if it ever scales,
//  update favoriteMeals to it's own schema if the document exceeds mongo's 16MB limit
const favoriteMeals = {
  name: String,
  calories: Number,
  nutrition: Object,
  prepTime: String,
  ingredients: Object,
  preparations: [String],
};

export interface IUser {
  _id: Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
  password: string;
  email: string;
  smsNumber?: string;
  bio?: string;
  sex: Sex;
  favoriteMeals: [];
  weightGoal?: number;
  weightProgress: [];
  weight: number;
  dailyTDEE: number;
  fitness?: {};
  birthday: Date;
  profilePictureUrl?: string;
  profileBannerUrl?: string;
  dailyCaloricIntake: number;
  followers: string[];
  following: string[];
  youFollow: boolean;
  updatedAt: Date;
  createdAt: Date;

  getAge(): number;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: {
      firstName: String,
      lastName: String,
    },
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  smsNumber: {
    type: String,
    unique: true,
    index: true,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: true,
  },
  favoriteMeals: {
    type: [favoriteMeals],
    default: () => [],
  },
  weightGoal: {
    type: Number,
    min: 69, // nice
    max: 420,
    required: false,
  },
  weightProgress: {
    type: [
      // can I add validator to the object?
      {
        date: Date, // todo: use timestamp? or date object?
        weight: Number,
      },
    ],
    default: () => [],
  },
  weight: {
    type: Number,
    min: 69, // nice
    max: 420,
    required: false,
  },
  dailyTDEE: {
    type: Number,
    min: 0,
    required: false,
  },
  fitness: {
    type: {
      weight: Number,
      height: Number,
      age: Number, // todo: use birthday to calculate age
    },
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  profilePictureUrl: {
    type: String,
    required: false,
  },
  profileBannerUrl: {
    type: String,
    required: false,
  },
  dailyCaloricIntake: {
    type: Number,
    required: false,
    min: 0,
  },
  followers: {
    type: [String],
    required: false,
    default: () => [],
  },
  following: {
    type: [String],
    required: false,
    default: () => [],
  },
  youFollow: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  ...BaseModel,
});

// Im not sure why this is not working, going to move this to /utils
// userSchema.methods.getAge = function (this: IUser) {
//   const birthDate = new Date(this.birthday);

//   // Get the current date
//   const currentDate = new Date();

//   // Calculate the difference in years between the current date and the birthday
//   let age = currentDate.getFullYear() - birthDate.getFullYear();

//   // Check if the current date is before the birthday this year
//   // If so, subtract 1 from the age because the birthday hasn't occurred yet
//   const isBeforeBirthday =
//     currentDate.getMonth() < birthDate.getMonth() ||
//     (currentDate.getMonth() === birthDate.getMonth() &&
//       currentDate.getDate() < birthDate.getDate());

//   if (isBeforeBirthday) {
//     age--;
//   }

//   console.log(age);
//   return age;
// };

export default mongoose.model<IUser>("User", userSchema);
