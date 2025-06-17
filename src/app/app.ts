import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// create mongoose schema
const noteSchema = new Schema({
  title: String,
  content: String,
  publishDate: Number,
});

// create mongoose model
const Note = model("Note", noteSchema); // "Note" is model name

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongoose",
    content: "I am learning mongoose",
    publishDate: "Hello",
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
