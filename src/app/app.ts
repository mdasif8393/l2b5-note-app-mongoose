import express, { Application, NextFunction, Request, Response } from "express";
import { noteRoutes } from "./controllers/notes.controller";

const app: Application = express();

app.use(express.json());
app.use("/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note-app-mongoose");
});

export default app;
