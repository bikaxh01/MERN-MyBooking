import { NextFunction, Request, Response } from "express";
import { ExpressValidator } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  
  if (!token) {
    return res.status(401).json({
        message:"Invalid User"
    });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_KEY as string);

    if (!verifyToken) {
      return res.status(401).json({
        message:"Invalid User"
    });
    }

    req.userId = (verifyToken as JwtPayload).userId;
    next()
  } catch (error) {
    return res.status(401).json({
        message:"Invalid User"
    })
  }
};
