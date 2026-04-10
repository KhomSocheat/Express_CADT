import { books } from "../models/book.model.js";
export const getAllBooks = (req, res) => {
	return res.json(books);
};

export const getBookById = (req, res) => {
	const id = parseInt(req.params.id);
	const book = books.find((b) => {
		return b.id === id;
	});
	if (!book) {
		return res.status(404).json({ message: "Not Found" });
	}
	return res.json(book);
};

export const UpdateBook = (req, res) => {
	const bookId = req.params.id;
	const bookIndex = books.findIndex((b) => {
		return bookId == b.id;
	});

	if (bookIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	books[bookIndex] = { id: parseInt(bookId), ...req.body };
	return res.json({ message: `Book with id ${bookId} updated` });
};

export const CreateBook = (req, res) => {
	books.push(req.body);
	return res
		.status(201)
		.json({ message: `Book with name ${req.body.title} created` });
};

export const DeleteBook = (req, res) => {
	const id = parseInt(req.params.id);
	const deleteIndex = books.findIndex((b) => {
		return b.id === id;
	});

	if (deleteIndex === -1) {
		return res.status(404).json({ message: "Not Found" });
	}

	books.splice(deleteIndex, 1);
	return res.json({ message: `Book with id ${id} deleted` });
};

