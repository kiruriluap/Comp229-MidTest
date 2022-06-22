llet mongoose = require('mongoose');

// create a model class
let bookSchema = mongoose.Schema({
    title: String,
    price: Number,
    author: String,
    genre: String,
    description: String
});

bookSchema.statics.checkTitle = function(title, callback){
	this.find({title:title}, (err, books) => {
		if(err){
			return callback('-1')//server error
		}
		//true: not exist; 
		//false: exist
		return callback(books.length === 0)
	})
}

bookSchema.statics.addBook = function(json, callback){
	this.checkTitle(json.title, (torf) => {
		if(torf){
			let book = new Book(json)
			book.save().then(()=>{
				callback('1') //1: book not exist, add successfully
			})
		}else{
			callback('0') //0: book exist, add failed
		}
	})
}
let Book = mongoose.model('Book', bookSchema)

module.exports = Book;