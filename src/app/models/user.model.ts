import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from "validator";

const userSchema = new Schema<IUser>({
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
});

export const User = model<IUser>("User", userSchema);
