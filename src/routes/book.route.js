import express from "express";
import * as BookController from "../controllers/book.controller.js";

const BookRouter = express.Router();

BookRouter.get("/", BookController.getAllBooks);
BookRouter.get("/:id", BookController.getBookById);
BookRouter.post("/", BookController.CreateBook);
BookRouter.patch("/:id", BookController.UpdateBook);
BookRouter.delete("/:id", BookController.DeleteBook);

export default BookRouter;
