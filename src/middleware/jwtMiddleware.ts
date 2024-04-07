import { IJwtConfig } from "../config/IJwtConfig";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const jwtMiddleware = (config: IJwtConfig) => {
  if (!config || !config.secret) {
    throw new Error("JWT configuration is required");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Failed to authenticate token" });
      }

      // Optionally, attach user or payload to the request
      // req.user = decoded;
      next();
    });
  };
};
