import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./router.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")||"";

if (!MONGO_URL) {
  console.log("No mongo URL found");
  console.error("No mongo URL found. Check environment variables.");
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

