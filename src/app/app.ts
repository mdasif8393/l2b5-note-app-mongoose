import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

// create mongoose schema
const noteSchema = new Schema(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// create mongoose model
const Note = model("Note", noteSchema); // "Note" is model name

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  const note = await Note.create(body);

  res.status(201).json({
    status: true,
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    status: true,
    message: "Notes retrieved successfully",
    notes,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findById(noteId);

  res.status(201).json({
    status: true,
    message: "Note retrieved successfully",
    note,
  });
});

app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    status: true,
    message: "Note updated successfully",
    note,
  });
});

app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    status: true,
    message: "Note deleted successfully",
    note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note-app-mongoose");
});

export default app;
