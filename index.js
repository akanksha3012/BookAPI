const { response, request } = require("express");

//database
const Database = require("./database");

//initialization
const express = require("express");

const OurAPP = express();

OurAPP.get("/", (request, response) => {
response.json({message: "Server is Working!!!..."});
});
//Route         -- /book
//Description   -- to get all books
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
OurAPP.get("/book",(req, res) => {
    return res.json({books: Database.Book});
});

//Route         -- /book/:bookID
//Description   -- to get a book based on ISBN
//Access        -- public
//Method        -- GET
//Params        -- bookID
//Body          -- none
OurAPP.get("/book/:bookID",(req, res) => {
    const getBook = Database.Book.filter((book) =>
     book.ISBN ===req.params.bookID);
    return res.json({book: getBook});
});

//Route         -- /book/c/:category
//Description   -- to get list of all books based on category
//Access        -- public
//Method        -- GET
//Params        -- category
//Body          -- none
OurAPP.get("/book/c/:category",(req, res) => {
    const getBook = Database.Book.filter((book) =>
     book.category.includes(req.params.category));
    return res.json({book: getBook});
});

//Route         -- /book/a/:author
//Description   -- to get list of all books based on author
//Access        -- public
//Method        -- GET
//Params        -- category
//Body          -- none
// OurAPP.get("/book/a/:Author",(req, res) => {
//     const getBook = Database.Author.filter((books) =>
//      Author.name.includes(req.params.Author));
//     return res.json({books: getBook});
// });

//Route         -- /book/a/:author
//Description   -- to get list of all authors
//Access        -- public
//Method        -- GET
//Params        -- category
//Body          -- none
OurAPP.get("/author",(req, res) => {
    return res.json({author: Database.Author});
});

OurAPP.listen(4000, () => console.log("server is running"));