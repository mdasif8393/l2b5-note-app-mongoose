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
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
exports.usersRoutes = express_1.default.Router();
// const CreateUserZodSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   age: z.number(),
//   email: z.string(),
//   password: z.string(),
//   role: z.string().optional(),
// });
exports.usersRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
        const body = req.body;
        //// instance method to hash password
        // const user = new User(body);
        // const password = await user.hashPassword(body.password);
        // user.password = password;
        // await user.save();
        //// custom static method to hash password
        // const password = await User.hashPassword(body.password);
        // body.password = password;
        const user = yield user_model_1.User.create(body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.usersRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.query.email;
    let users = [];
    ////filter
    // if (userEmail) {
    //   users = await User.find({ email: userEmail });
    // } else {
    //   users = await User.find();
    // }
    ////sort
    // users = await User.find().sort({ email: "desc" });
    // skip
    // users = await User.find().skip(2);
    //limit
    users = yield user_model_1.User.find().limit(2);
    res.status(201).json({
        success: true,
        message: "All Users retreived successfuly",
        users,
    });
}));
exports.usersRoutes.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_model_1.User.findById(userId);
    res.status(201).json({
        success: true,
        message: "User retrived successfuly",
        user,
    });
}));
exports.usersRoutes.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_model_1.User.findOneAndDelete({ _id: userId });
    res.status(201).json({
        success: true,
        message: "User Deleted successfuly",
        user,
    });
}));
exports.usersRoutes.patch("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = yield user_model_1.User.findByIdAndUpdate(userId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "User updated successfuly",
        user,
    });
}));
