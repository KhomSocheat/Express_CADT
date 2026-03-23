import express from "express";
import * as MoneyController from "../controllers/money.controller.js";

const MoneyRouter = express.Router();

MoneyRouter.get("/", MoneyController.getAllMoney);
MoneyRouter.get("/:id", MoneyController.getMoneyById);
MoneyRouter.post("/", MoneyController.CreateMoney);
MoneyRouter.patch("/:id", MoneyController.UpdateMoney);
MoneyRouter.delete("/:id", MoneyController.DeleteMoney);

export default MoneyRouter;
