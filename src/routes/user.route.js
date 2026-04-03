import express from "express";
import * as UserController from "../controllers/user.controller.js";
const UserRouter = express.Router();
import { handleValidation } from "../middleware/index.js";
import { createUserValidator } from "../validators/user.validator.js";

UserRouter.get("/", UserController.getAllUser);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post("/",createUserValidator, handleValidation, UserController.CreateUser);
UserRouter.patch("/:id", UserController.UpdateUser);
UserRouter.delete("/:id", UserController.DeleteUser);

export default UserRouter;
