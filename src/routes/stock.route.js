import express from "express";
import * as StockController from "../controllers/stock.controller.js";
import { stockMiddleware } from "../middleware/index.js";

const StockRouter = express.Router();

StockRouter.get("/",stockMiddleware ,StockController.getAllStock);
StockRouter.get("/:id", StockController.getStockById);
StockRouter.post("/", StockController.CreateStock);
StockRouter.patch("/:id", StockController.UpdateStock);
StockRouter.delete("/:id", StockController.DeleteStock);

export default StockRouter;
