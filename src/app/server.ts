import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const port = 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.h5pr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to mongodb using mongoose");
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
