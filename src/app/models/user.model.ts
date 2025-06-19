import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserInstanceMethods, UserStaticMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minLength: [3, `First Name must be 3 character, got {value}`],
      maxLength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, `Last Name must be 3 character, got {value}`],
      maxLength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: [18, `Minimum age must be 18 but got {VALUE}`],
      max: 60,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      //// custom validation
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid email`,
      // },
      validate: [validator.isEmail, "{VALUE} is not a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["ADMIN", "USER", "SUPERADMIN"],
        message: `{value is not supported}`,
      },
      default: "USER",
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//custom instance method to hash password
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// custom static method to hash password
userSchema.static("hashPassword", async function (plainPassword) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
