import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	url: String,
	email: {
		type: String,
		lowercase: true,
		trim: true,
		validate: [
			{
				validator: function (v) {
					return v.toLowerCase() === v;
				},
				message: 'Email must be lowercase.',
			},
			{
				validator: function (v) {
					return /^\S+@\S+\.\S+$/.test(v);
				},
				message: 'Please enter a valid email.',
			},
		],
	},
});

// olusturdugumuz her schema nin kendine ait otomatik bir id si olur.
const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 255,
		trim: true,
	},
	description: String,
	numberOfPages: {
		type: Number,
		trim: true,
		min: 10,
		max: 2000,
		required: true,
	},
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenPurchased: Date,
	whenCreated: {
		type: Date,
		default: () => Date.now(),
	},
	relatedBook: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'book'
	},
	topics: [String],
	author: authorSchema,
});

export const Book = mongoose.model('book', bookSchema);
