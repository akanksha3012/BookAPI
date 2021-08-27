const { response, request } = require("express");
const express = require("express");

//database
const Database = require("./database");
   
//initialization
const OurAPP = express();

OurAPP.use(express.json());

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
//Params        -- author
//Body          -- none
 OurAPP.get("/book/a/:Author",(req, res) => {
     const getBook = Database.Book.filter((book) =>
     book.category.includes(req.params.Author));
     return res.json({book: getBook});
 });

//Route         -- /book/a/:author
//Description   -- to get list of all authors
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
OurAPP.get("/author",(req, res) => {
    return res.json({author: Database.Author});
});
//Route         -- /book/a/:author
//Description   -- to get specific author
//Access        -- public
//Method        -- GET
//Params        -- author id
//Body          -- none
OurAPP.get("/author/:authorID",(req, res) => {
    const getAuthor = Database.Author.filter((author) =>
     author.id == req.params.authorID);
    return res.json({author: getAuthor});
});


//Route         -- /publication
//Description   -- to get all publications
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
OurAPP.get("/publication",(req, res) => {
    return res.json({publication: Database.Publication});
});
//Route         -- /publcation/:publicationID
//Description   -- to get a specific publication based on ID
//Access        -- public
//Method        -- GET
//Params        -- publicationID
//Body          -- none
OurAPP.get("/publication/:publicationID",(req, res) => {
    const getPublication = Database.Publication.filter((publication) =>
     publication.id == req.params.publicationID);
    return res.json({publication: getPublication});
});


//--------------------------------------------
//Route         -- /book/new
//Description   -- to add new book
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
OurAPP.post("/book/new", (req, res) => {
    console.log(req.body);
    res.json({message: 'Book added successfully'});
});
//Route         -- /author/new
//Description   -- to add new author
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
OurAPP.post("/author/new", (req,res)=>{
    //destructuring of data
    //nested object
    const {newAuthor} = req.body;
    console.log(newAuthor);
    return res.json({message: 'author added successfully'});
});
//Route         -- /publication/new
//Description   -- to add new author
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
OurAPP.post("/publication/new", (req,res)=>{
    
    const {newPublication} = req.body;
    console.log(newPublication);
    return res.json({message: 'Publication added successfully'});
});

//--------------------------------------------------------------------------
//Route         -- /book/update
//Description   -- to update any details of book
//Access        -- public
//Method        -- PUT
//Params        -- ISBN
OurAPP.put("/book/updateTitle/:isbn", (req,res) => {
  const {updatedBook} = req.body;
  const {isbn} = req.params;

   Database.Book.forEach((book) => {
      if(book.ISBN === isbn) {
          book.title = updatedBook.title;
          return book;
      }
      return book;
    })
    return res.json(Database.Book);
});

//Route         -- /bookAuthor/update/:isbn
//Description   -- to update/add new author to a book
//Access        -- public
//Method        -- PUT
//Params        -- ISBN
OurAPP.put('/book/updateAuthor/:isbn', (req,res) =>{
 const {newAuthor} = req.body;
 const {isbn} = req.params;

 //updating book database object
 Database.Book.forEach((book) => {
     // check if isbn match
    if(book.ISBN === isbn) {
        // check if author already exists
        if(!book.authors.includes(newAuthor)){
            // if not then push new author
             book.authors.push(newAuthor);
             return book;
        }
        return book;
    }
    return book;
   })
   Database.Author.forEach((author) => {
       if(author.id === newAuthor){
           if(!author.books.includes(isbn)){
               author.books.push(isbn);
               return author;
           }
           return author;
       }
       return author;
   })
   return res.json({book: Database.Book, author: Database.Author});
 });
//Route         -- /author/update
//Description   -- to update any details of author
//Access        -- public
//Method        -- PUT
//Params        -- id
//params in the req.body are always in string format
OurAPP.put('/author/updateName/:id', (req, res) => {
    const { updateAuthor } = req.body;
    const { id } = req.params;
  console.log(id);
    Database.Author.forEach((author) => {
        if(author.id === parseInt(id)) {
            author.name = updateAuthor.name;
            return author;
        }
        return author;
      });
      return res.json(Database.Author);
  });

//---------------------------------------------------------------------------
//Route         -- /book/delete/:isbn
//Description   -- to delete a book
//Access        -- public
//Method        -- DELETE
//Params        -- isbn
OurAPP.delete('/book/delete/:isbn', (req,res) => {
   const {isbn} = req.params;
   const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);

   Database.Book = filteredBooks;
   return res.json(Database.Book);
});
//Route         -- /book/delete/author
//Description   -- to delete an author from a book
//Access        -- public
//Method        -- DELETE
//Params        -- id, isbn
OurAPP.delete('/book/delete/author/:isbn/:id', (req,res) => {
    const {isbn, id} = req.params;
    // updating book database object
    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){
                return book;
               
            }
            book.authors = book.authors.filter((databaseId) => databaseId !== parseInt(id));
            return book;
        }
        return book;
    })
   Database.Author.forEach((author) => {
       if(author.id === parseInt(id)){
           if(!author.books.includes(isbn)){
               return author;
           }
           author.books = author.books.filter((book) => book !== isbn);
           return author;
       }
      return author;
   });
   return res.json({book: Database.Book, author: Database.Author})
});
//Route         -- /author/delete
//Description   -- to delete an author
//Access        -- public
//Method        -- DELETE
//Params        -- id
OurAPP.delete('/author/delete/:id',(req,res) => {
    const {id} = req.params;
    const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(id));
 
    Database.Author = filteredAuthors;
    return res.json(Database.Author);

});
//Route         -- /publication/delete
//Description   -- to delete an publication
//Access        -- public
//Method        -- DELETE
//Params        -- id
OurAPP.delete('/publication/delete/:id',(req,res) =>{
    const {id} = req.params;
    const filteredPublications = Database.Publication.filter((publication) => publication.id !== parseInt(id));
 
    Database.Publication = filteredPublications;
    return res.json(Database.Publication);
});
//Route         -- /publication/delete/book
//Description   -- to delete a book from a publication
//Access        -- public
//Method        -- DELETE
//Params        -- id, isbn
OurAPP.delete('/publication/delete/book/:isbn/:id',(req,res) =>{
    const {isbn, id} = req.params;
    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            book.publication = 0;
            return book;
        }
        return book;
    })
    Database.Publication.forEach((publication) => {
        if(publication.id === parseInt(id)){
            const filteredBooks = publication.books.filter((book) => book !== isbn);
            publication.books = filteredBooks;
            return publication;
        }
        return publication;
    });
    return res.json({book: Database.Book, publication: Database.Publication});
});

OurAPP.listen(4000, () => console.log("server is running"));