import express, { Request, Response } from "express";
import { jwtMiddleware } from "auth-zen";
const app = express();

app.post(
  "/",
  jwtMiddleware({
    secret: "my-secret",
    expiresIn: "1h",
  }),
  (req: Request, res: Response) => {
    res
      .status(200)
      .send({ message: "Hello World! your jwt token is accepted" });
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
