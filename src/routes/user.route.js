import express from "express";
import * as UserController from "../controllers/user.controller.js";
const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUser);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post("/", UserController.CreateUser);
UserRouter.patch("/:id", UserController.UpdateUser);
UserRouter.delete("/:id", UserController.DeleteUser);

export default UserRouter;
