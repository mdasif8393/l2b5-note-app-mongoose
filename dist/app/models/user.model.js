"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const notes_model_1 = require("./notes.model");
const addressSchema = new mongoose_1.Schema({
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
}, {
    _id: false,
});
const userSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, "{VALUE} is not a valid email"],
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
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
//custom instance method to hash password
userSchema.method("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        return password;
    });
});
// custom static method to hash password
userSchema.static("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        return password;
    });
});
// pre middleware to hash password before save in database
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
//post middleware to delete notes of the specific user when delete
userSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield notes_model_1.Note.deleteMany({ user: doc._id });
        }
        next();
    });
});
// virtuals to make full name
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
