import { stock } from "../models/stock.model.js";

export const getAllStock = (req, res) => {
	let filteredStock = stock;

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
};

export const getStockById = (req, res) => {
	const id = parseInt(req.params.id);
	const item = stock.find((s) => {
		return s.id === id;
	});
	if (!item) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.json(item);
};

export const UpdateStock = (req, res) => {
	const stockId = req.params.id;
	const stockIndex = stock.findIndex((s) => {
		return stockId == s.id;
	});

	if (stockIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	stock[stockIndex] = { id: parseInt(stockId), ...req.body };
	return res.json({ message: `Stock with id ${stockId} updated` });
};

export const CreateStock = (req, res) => {
	stock.push(req.body);
	return res
		.status(201)
		.json({ message: `Stock with name ${req.body.name} created` });
};

export const DeleteStock = (req, res) => {
	const id = parseInt(req.params.id);
	const deleteIndex = stock.findIndex((s) => {
		return s.id === id;
	});

	if (deleteIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	stock.splice(deleteIndex, 1);
	return res.json({ message: `Stock with id ${id} deleted` });
};

