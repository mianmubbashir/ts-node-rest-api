import { deleteBookById, getBookById, getBooks, createBook } from "../db/books";
import express from "express";

export const postBook = async(req: express.Request, res: express.Response) => {
    try{
        const { name, author, description } = req.body;

        if(!name || !author || !description){
            return res.status(400);
        }

        const book = await createBook({
            name,
            author,
            description
        })
        return res.status(200).json(book);

    } catch(error){
        console.log(error);
        return res.status(500);
    }
}

export const getAllBooks = async (req: express.Request, res: express.Response) => {
    try{
        const books = await getBooks();

       return res.status(200).json(books);
    } catch(error){
        console.log(error);
        return res.status(500);
    }
}

export const deleteBook = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const deletedBook = await deleteBookById(id);
        return res.json(deletedBook);

    } catch(error){
        console.log(error);
        return res.send(500);
    }
}

export const updateBook = async (req: express.Request, res: express.Response) => {
   try{
    const { id } = req.params;
    const { author } = req.body;

    if(!author){
        return res.status(400);
    }

    const book = await getBookById(id);
    book.author = author;
    await book.save();

    return res.status(200).json(book).end();
   } catch(error){
     console.log(error);
     return res.status(500);
   }
}