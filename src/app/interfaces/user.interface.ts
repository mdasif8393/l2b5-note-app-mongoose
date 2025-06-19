import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: IAddress;
}

// custom instance method to hash password
export interface UserInstanceMethods {
  hashPassword(password: string): string;
}

// custom static method to hash password
export interface UserStaticMethods extends Model<IUser> {
  hashPassword(password: string): string;
}
