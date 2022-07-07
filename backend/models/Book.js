import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	url: String,
	email: {
		type: String,
		lowercase: true,
	},
});
// olusturdugumuz her schema nin kendine ait otomatik bir id si olur.
const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	numberOfPages: {
		type: Number,
		min: 10,
		max: 2000,
		required: true
	},
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	whenCreated: {
		type: Date,
		default: () => Date.now(),
	},
	relatedBook: mongoose.SchemaTypes.ObjectId,
	topics: [String],
	author: authorSchema,
});

export const Book = mongoose.model('book', bookSchema);
