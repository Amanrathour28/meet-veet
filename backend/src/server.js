import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// ✅ 1. Inngest FIRST (raw body, no middleware before)
app.use("/api/inngest", serve({ client: inngest, functions }));

// ✅ 2. JSON parser AFTER Inngest
app.use(express.json());

// ✅ 3. Clerk AFTER Inngest
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server running on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
