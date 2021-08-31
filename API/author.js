
const AuthorModel = require('../schema/author');
const Router = require('express').Router();

//Route         -- /author
//Description   -- to get list of all authors
//Access        -- public
//Method        -- GET
//Params        -- none
//Body          -- none
Router.get("/author", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});
//Route         -- /author/:authorID
//Description   -- to get specific author
//Access        -- public
//Method        -- GET
//Params        -- author id
//Body          -- none
Router.get("/author/:authorID", async(req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({id: req.params.authorID});
    if(!getSpecificAuthor){
        return res.json({
            error: `No Author Found for the id of ${req.params.authorID}`,
        })
    }
    return res.json({author: getSpecificAuthor});
});
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /author/new
//Description   -- to add new author
//Access        -- public
//Method        -- POST
//Params        -- none
//Body          -- yes
Router.post("/author/new", (req,res)=>{
    //destructuring of data
    //nested object
    const {newAuthor} = req.body;
    Author.create(newAuthor);
    return res.json({message: 'author added successfully'});
});
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /author/update
//Description   -- to update any details of author
//Access        -- public
//Method        -- PUT
//Params        -- id
//params in the req.body are always in string format
Router.put('/author/updateName/:id', async(req, res) => {
    const { name } = req.body.name;
    const updateAuthor = await AuthorModel.findOne(
        {
            id: req.params.id,
        },
        {
            name: name,
        },
        {
            new: true,
        },
        );
    
      return res.json({author: updateAuthor});
  });
//------------------------------------------------------------------------------------------------------------------------
//Route         -- /author/delete
//Description   -- to delete an author
//Access        -- public
//Method        -- DELETE
//Params        -- id
Router.delete('/author/delete/:id',async(req,res) => {
    const {id} = req.params;
    const updateAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: parseInt(id)
        });
       
    return res.json({authors: updateAuthorDatabase});
});

module.exports = Router;