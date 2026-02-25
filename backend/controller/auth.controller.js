import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 6 character ",
      });
    }

    const emailLower = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLower });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: emailLower,
      password: bcryptPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created Successfully !",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User does'nt exist please register !",
      });
    }

    // 2. Compare password
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password !",
      });
    }

    // generate jwt
    const token = jwt.sign(
      { id: userExist._id, role: userExist.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successfully ",
      token: token,
    });
  } catch (error) {
    console.error("login failed! ", error);
  }
};
