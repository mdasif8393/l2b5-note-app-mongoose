import express, { Application, Request, Response } from "express";
import { noteRoutes } from "./controllers/notes.controller";
import { usersRoutes } from "./controllers/user.controller";

const app: Application = express();

app.use(express.json());
app.use("/notes", noteRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note-app-mongoose");
});

export default app;
