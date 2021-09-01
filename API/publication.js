const Router = require('express').Router();
const PublicationModel = require('../schema/publication');
const BookModel = require('../schema/book');


//Route         -- /publication
//Description   -- to get all publications
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
Router.get("", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});
//Route         -- /publcation/:publicationID
//Description   -- to get a specific publication based on ID
//Access        -- public
//Method        -- GET
//Params        -- publicationID
//Body          -- none
Router.get("/:publicationID", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({id: req.params.publicationID});
    if(!getSpecificPublication){
        return res.json({
            error: `No Publication Found for the id of ${req.params.publicationID}`,
        })
    }
    return res.json({publication: getSpecificPublication});
});
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /publication/new
//Description   -- to add new author
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
Router.post("/new", async (req,res)=>{
    
    const {newPublication} = req.body;
    await PublicationModel.create(newPublication);
    return res.json({message: 'Publication added successfully'});
});
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /publication/delete
//Description   -- to delete an publication
//Access        -- public
//Method        -- DELETE
//Params        -- id
Router.delete('/delete/:id', async (req,res) =>{
    const {id} = req.params;
    const updatePublicationDatabase = await PublicationModel.findOneAndDelete({
        id: parseInt(id)
        });
       
    return res.json({publications: updatePublicationDatabase});
});
//Route         -- /publication/delete/book
//Description   -- to delete a book from a publication
//Access        -- public
//Method        -- DELETE
//Params        -- id, isbn
Router.delete('/delete/book/:isbn/:id', async(req,res) =>{
    const {isbn, id} = req.params;
    //updating database object
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: isbn,
    },
    {
        $pull:{
            publications: parseInt(id)
        },
    },
    {
        new: true,
    });
   const updatedPublication = await PublicationModel.findOneAndUpdate(
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
    return res.json({message: 'Publication was deleted', book: updatedBook, publication: updatedPublication});
});

module.exports = Router;