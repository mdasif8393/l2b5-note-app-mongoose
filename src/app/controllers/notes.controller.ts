import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const noteRoutes = express.Router();

noteRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  const note = await Note.create(body);

  res.status(201).json({
    status: true,
    message: "Note created successfully",
    note,
  });
});

noteRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");

  res.status(201).json({
    status: true,
    message: "Notes retrieved successfully",
    notes,
  });
});

noteRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findById(noteId);

  res.status(201).json({
    status: true,
    message: "Note retrieved successfully",
    note,
  });
});

noteRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    status: true,
    message: "Note updated successfully",
    note,
  });
});

noteRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    status: true,
    message: "Note deleted successfully",
    note,
  });
});
