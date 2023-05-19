import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
       name: { type: String, required: true },
       author: { type: String, required: true },
       description: { type: String, required: true }
})

export const BookModel = mongoose.model('Book', BookSchema);

export const createBook = (values: Record<string, any>) => new BookModel(values).save().then((book) => book.toObject());
export const getBooks = () => BookModel.find();
export const getBookById = (id: string) => BookModel.findById(id)
export const deleteBookById = (id: string) => BookModel.findOneAndDelete({_id: id});
export const updateBookById = (id: string, values: Record<string, any>) => BookModel.findByIdAndDelete({id, values });