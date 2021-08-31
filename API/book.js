const BookModel = require('../schema/book');
const AuthorModel = require('../schema/author');
const Router = require('express').Router();

//Route         -- /book
//Description   -- to get all books
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
Router.get("/book", async (req, res) => {
    // we use asycn as the Book.ind may take time
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

//Route         -- /book/:bookID
//Description   -- to get a book based on ISBN
//Access        -- public
//Method        -- GET
//Params        -- bookID
//Body          -- none
Router.get("/book/:bookID", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.bookID});
    if(!getSpecificBook){
        return res.json({
            error: `No Book Found for the ISBN of ${req.params.bookID}`,
        });
    }
    return res.json(getSpecificBook);
});

//Route         -- /book/c/:category
//Description   -- to get list of all books based on category
//Access        -- public
//Method        -- GET
//Params        -- category
//Body          -- none
Router.get("/book/c/:category", async(req, res) => {
    const getSpecificBooks = await BookModel.find({category: req.params.category});
    if(!getSpecificBooks){
        return res.json({error: `no books found for the category of ${req.params.category}`});
    }
    return res.json(getSpecificBooks);
});

//Route         -- /book/a/:author
//Description   -- to get list of all books based on author
//Access        -- public
//Method        -- GET
//Params        -- author
//Body          -- none
 Router.get("/book/a/:Author", async(req, res) => {
     const getBook = await BookModel.find({authors: req.params.Author});
     if(!getBooks){
        return res.json({error: `no books found for the author of id ${req.params.Author}`});
    }
     return res.json(getBook);
 });
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /book/new
//Description   -- to add new book
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
Router.post("/book/new", async (req, res) => {
    try{
        const { newBook } = req.body;
        
        await BookModel.create(newBook);
        res.json({message: 'Book added added to th database'});
    }catch(error){
        return res.json({error: error.message});
    }
    
    res.json({message: 'Book added successfully'});
});
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /book/update
//Description   -- to update title of book
//Access        -- public
//Method        -- PUT
//Params        -- ISBN
Router.put("/book/updateTitle/:isbn", async (req,res) => {
    const {title} = req.body.title;
    const updateBook = await BookModel.findOne(
        {
            ISBN: req.params.isbn,
        },
        {
            title: title,
        },
        {
            new:true,
        },
        );
    
      return res.json({book: updateBook});
});
  
  //Route         -- /bookAuthor/update/:isbn
  //Description   -- to update/add new author to a book
  //Access        -- public
  //Method        -- PUT
  //Params        -- ISBN
  Router.put('/book/updateAuthor/:isbn', async(req,res) =>{
   const {newAuthor} = req.body;
   const {isbn} = req.params;
   const updateBook = await BookModel.findOneAndUpdate(
   {
        ISBN: isbn,
   },
   {
        $addToSet:{
            authors: newAuthor,
        }
   },
   {
        new: true,
   },
   );
   const updateAuthor = await AuthorModel.findOneAndUpdate(
       {
           id: newAuthor,
       },
       {
           $addToSet:{
               books: isbn,
           }
       },
       {
           new:true,
       },
   );
   return res.json({books: updateBook, authors:updateAuthor, message:'New author was added into the database'})
   });
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /book/delete/:isbn
//Description   -- to delete a book
//Access        -- public
//Method        -- DELETE
//Params        -- isbn
Router.delete('/book/delete/:isbn', async(req,res) => {
    const {isbn} = req.params;
    const updateBookDatabase = await BookModel.findOneAndDelete({
    ISBN: isbn
    })
   
    return res.json({books: updateBookDatabase});
 });
 //Route         -- /book/delete/author
 //Description   -- to delete an author from a book
 //Access        -- public
 //Method        -- DELETE
 //Params        -- id, isbn
 Router.delete('/book/delete/author/:isbn/:id', async(req,res) => {
     const {isbn, id} = req.params;
     //updating database object
     const updatedBook = await BookModel.findOneAndUpdate({
         ISBN: isbn,
     },
     {
         $pull:{
             authors: parseInt(id)
         },
     },
     {
         new: true,
     });
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: parseInt(id),
    },
    {
         $pull:{
             books: isbn,
         },
    },
    {
         new: true,
    }
    );
     return res.json({message: 'Author was deleted', book: updatedBook, author: updatedAuthor});
 });  

 module.exports = Router;