import express from 'express';

import { deleteBook, getAllBooks, updateBook, postBook } from '../controllers/books';

export default (router: express.Router) => {
    router.post('/createbook', postBook)
    router.get('/books', getAllBooks);
    router.delete('/books/:id', deleteBook);
    router.patch('/books/:id', updateBook);
}