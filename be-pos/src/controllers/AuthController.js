// const { response } = require("express");

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

// const USERS = [
//   {
//     name: "Reza",
//     email: "admin@gmail.com",
//     password: "12345678",
//   },
// ];

//export const login - bisa seperti ini
export const login = async (req, res) => {
  // const email = req.body.email - bisa seperti ini
  const { email, password } = req.body;

  if (!email || !password) {
    // 400: bad response (browser)
    // 500: server error (server/database)
    // 200: success

    // jika email kosong atau password kosong
    res.status(400).json({
      status: false,
      message: "Email atau Password required",
    });
  }
  //   find()
  // const user = USERS.find((u) => u.email === email && u.password === password);
  const [user] = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = ?",
    [email],
  );
  if (user.length === 0) {
    return res.status(401).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  const dataUser = user[0];
  const isMatch = await bcrypt.compare(password, dataUser.password);
  if (!isMatch) {
    // 401: unauthorize:login gagal
    return res.status(401).json({
      status: false,
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: dataUser.id,
      name: dataUser.name,
      email: dataUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  res.status(200).json({
    status: true,
    message: "Login Success",
    data: {
      user: {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
      },
      token,
    },
  });
};