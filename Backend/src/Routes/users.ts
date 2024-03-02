import express, { Request, Response } from "express";
import { User } from "../Model/user.model";
const router = express.Router();
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { log } from "console";

router.post(
  "/register",
  [
    check("firstName", "First name is require").isString(),
    check("lastName", "Last name is require").isString(),
    check("email", "Email name is require").isEmail(),
    check("password", "Password name is require").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      return res.status(400).json({ message: validationError.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_toke", token, {
        httpOnly: true,
        secure: true,
        maxAge: 86400000,
      });
      res.status(200).json({
        message: "Ok",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something Went Wrong..!",
      });
    }
  }
);

router.post(
  "/loggin",
  [
    check("email", "Email is required"),
    check("password", "Password is require"),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid user",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(password, process.env.JWT_KEY as string);

 // Set the cookie
res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true,
  });
  
  // Send the JSON response
  res.status(200).json({
    message: "Successfully logged in...",
  });
  
  }
);

export default router;
