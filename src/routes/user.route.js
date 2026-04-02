import express from "express";
import * as UserController from "../controllers/user.controller.js";
const UserRouter = express.Router();
import { body } from "express-validator";
import { handleValidation } from "../middleware/index.js";

UserRouter.get("/", UserController.getAllUser);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post(
  "/",
  body("email").isEmail(),
  body("age").isInt({ min: 10, max: 100 }),
  body("role").isInt(["member", "admin", "editor"]),
  body("name").isAlpha(),
  handleValidation,
  UserController.CreateUser,
);
UserRouter.patch("/:id", UserController.UpdateUser);
UserRouter.delete("/:id", UserController.DeleteUser);

export default UserRouter;
