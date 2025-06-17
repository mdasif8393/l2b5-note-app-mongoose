import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// create mongoose schema
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "gray",
    },
  },
});

// create mongoose model
const Note = model("Note", noteSchema); // "Note" is model name

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Express",
    tags: {
      label: "database",
    },
  });

  await myNote.save();

  res.status(201).json({
    status: true,
    message: "Note created successfully",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note-app-mongoose");
});

export default app;
