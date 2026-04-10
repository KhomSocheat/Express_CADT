import stockModel from "../models/stock.model.js";
import asyncHandler from "express-async-handler";





export const CreateStock = asyncHandler(async (req, res) => {
    const stock = new stockModel(req.body);
    await stock.save();

    return res.status(201).json(stock);
});


export const getAllStock = asyncHandler(async (req, res) => {
	const limit = parseInt(req.query.limit) || 10;
	const page = parseInt(req.query.page) || 1;
	const populate = req.query.populate || "";
	const minQuantity = req.query.minQuantity;
	const maxQuantity = req.query.maxQuantity;
	const query = {};

	if (minQuantity || maxQuantity) {
		query.quantity = {};
	}

	if (minQuantity) {
		query.quantity.$gte = Number(minQuantity);
	}

	if (maxQuantity) {
		query.quantity.$lte = Number(maxQuantity);
	}

	const options = {
		page,
		limit,
		populate,
	};

	const filteredStock = await stockModel.paginate(query, options);

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

