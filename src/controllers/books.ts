import express from "express";
import {
  validateBook,
  validateBookId,
  validateBookUpdate,
} from "../validation/book.validation";
import { deleteBookById, getBookById, getBooks, Book, getBooksByUserId } from "../db/books";
import { SUCCESS } from "../messages/success";
import { ERRORS } from "../messages/errors";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { name, author, description } = req.body;

    const { is_validated, status, message } = validateBook(req.body);
    if (is_validated === false) return res.status(status).send({ message });

    const user_id = req.body['user']['user_id']

    const book = await Book({
      name,
      author,
      description,
      user_id,
    });

    return res.status(200).send({ data: book, message: SUCCESS.book_created });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: ERRORS.server_error });
  }
};

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const { is_validated, status, message } = validateBookId({ id });
    if (is_validated === false) return res.status(status).send({ message });

    const getBook = await getBookById(id);

    return res
      .status(200)
      .send({ data: getBook, message: SUCCESS.book_fetched });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: ERRORS.server_error });
  }
};

export const getByUserId = async (req: express.Request, res: express.Response) => {

  const user_id = req.body['user']['user_id']

  try {
    const books = await getBooksByUserId(user_id);
    return res.status(200).send({ data: books, message: SUCCESS.book_fetched });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: ERRORS.server_error });
  }
};

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const books = await getBooks();
    return res.status(200).send({ data: books, message: SUCCESS.book_fetched });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: ERRORS.server_error });
  }
};

export const remove = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const { is_validated, status, message } = validateBookId({ id });
    if (is_validated === false) return res.status(status).send({ message });

    const deletedBook = await deleteBookById(id);

    return res
      .status(200)
      .send({ data: deletedBook, message: SUCCESS.book_deleted });
  } catch (error) {
    console.log(error);
    return res.send(500).send({ error, message: ERRORS.server_error });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    console.log("id", id);

    const { is_validated, status, message } = validateBookUpdate({
      id,
      ...req.body,
    });
    if (is_validated === false) return res.status(status).send({ message });

    let book: any = await getBookById(id);

    Object.keys(req.body).forEach((key: string) => {
      book[key] = req.body[key];
    });

    await book.save();

    return res.status(200).send({ data: book, message: SUCCESS.book_updated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: ERRORS.server_error });
  }
};
