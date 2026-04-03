import express from "express";
import * as StockController from "../controllers/stock.controller.js";
import { stockMiddleware } from "../middleware/index.js";
import { createStockValidator } from "../validators/stock.validator.js";

const StockRouter = express.Router();

StockRouter.get("/",stockMiddleware ,StockController.getAllStock);
StockRouter.get("/:id", StockController.getStockById);
StockRouter.post("/", createStockValidator,StockController.CreateStock);
StockRouter.patch("/:id", StockController.UpdateStock);
StockRouter.delete("/:id", StockController.DeleteStock);

export default StockRouter;
