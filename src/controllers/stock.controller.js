import stockModel from "../models/stock.model.js";
import asyncHandler from "express-async-handler";





export const CreateStock = asyncHandler(async (req, res) => {
    const stock = new stockModel(req.body);
    await stock.save();

    return res.status(201).json(stock);
});


export const getAllStock = asyncHandler(async (req, res) => {
	let filteredStock = await stockModel.find();

	if (req.query.maxQuantity) {
		filteredStock = filteredStock.filter((s) => {
			return s.quantity <= Number(req.query.maxQuantity);
		});
	}

	if (req.query.minQuantity) {
		filteredStock = filteredStock.filter((s) => {
			return s.quantity >= Number(req.query.minQuantity);
		});
	}

		return res.json(filteredStock);
});

export const getStockById = asyncHandler(async (req, res) => {
	const id = parseInt(req.params.id);
	const item = await stockModel.findById(id);
	if (!item) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.json(item);
});

export const UpdateStock = asyncHandler(async (req, res) => {
	const stockId = req.params.id;
	const item = await stockModel.findByIdAndUpdate(stockId, req.body, { new: true });
	return res.status(200).json({ message: `Stock with id ${stockId} updated`, item });
});


export const DeleteStock = asyncHandler(async (req, res) => {
	const stockId = req.params.id;
	const detele = await stockModel.findByIdAndDelete(stockId);
	return res.json({ message: `Stock with id ${stockId} deleted` });
});

