import { money } from "../models/money.model.js";

export const getAllMoney = (req, res) => {
	return res.json(money);
};

export const getMoneyById = (req, res) => {
	const id = parseInt(req.params.id);
	const item = money.find((m) => {
		return m.id === id;
	});
	if (!item) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.json(item);
};

export const UpdateMoney = (req, res) => {
	const moneyId = req.params.id;
	const moneyIndex = money.findIndex((m) => {
		return moneyId == m.id;
	});

	if (moneyIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	money[moneyIndex] = { id: parseInt(moneyId), ...req.body };
	return res.json({ message: `Money record with id ${moneyId} updated` });
};

export const CreateMoney = (req, res) => {
	money.push(req.body);
	return res
		.status(201)
		.json({ message: `Money record with amount ${req.body.amount} created` });
};

export const DeleteMoney = (req, res) => {
	const id = parseInt(req.params.id);
	const deleteIndex = money.findIndex((m) => {
		return m.id === id;
	});

	if (deleteIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	money.splice(deleteIndex, 1);
	return res.json({ message: `Money record with id ${id} deleted` });
};

