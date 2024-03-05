import express, { Request, Response } from "express";
import { User } from "../Model/user.model";
const router = express.Router();
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { validateToken } from "../Middleware/auth";

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

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 86400000,
      });
      res.status(200).json({
        message: "Account created successfully...",
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
    const validateInput = validationResult(req);
    if (!validateInput.isEmpty()) {
      return res.status(400).json({ message: validateInput.array() });
    }
    const { email, password } = req.body;
    try {
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

      const token = jwt.sign(user.password, process.env.JWT_KEY as string);

      // Set the cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
      });

      // Send the JSON response
      res.status(200).json({
        message: "Successfully logged in...",
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong...",
      });
    }
  }
);

router.get("/validate-token", validateToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/sign-out", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.json({
    message: "LoggeOut Success",
  });
});

export default router;
