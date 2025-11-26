let books = require("../ddddddatadatatlllBoBoo/s BOOKS */

exports.getAllBooks = (req, res) => {
    res.json(books);
};

/* GET A SINGLE BOOK BY ID */

exports.getBookById = (req, res) => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }

    res.status(200).json(book);
};


//ET
