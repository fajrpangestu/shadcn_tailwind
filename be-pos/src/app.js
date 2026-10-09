import express from "express";
import cors from "cors";

// import { login } from "./controllers/AuthController";
import authRoutes  from "./routes/authRoutes.js";
import userRouters from "./routes/userRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use ("/api/auth", authRoutes);
app.use ("/api/user", userRouters);

// http://localhost:5000/api/auth/login
// app.post('/api/auth/login', login);

app.get("/", (req, res) => {
  // req: proses mengambl data dari body dan parameter
  // req.body, req.params
//   res.send();
  res.json({ message: "Welcome to POS API" });
});
export default app;