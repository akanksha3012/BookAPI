require("dotenv").config();

const express = require("express");

const mongoose = require('mongoose');

// Importing different Schemas
// const BookModel = require("./Schema/book");
// const AuthorModel = require("./Schema/author");
// const PublicationModel = require("./Schema/publication");

//API
const Book = require('./API/book');
const Author = require('./API/author');
const Publication = require('./API/publication');

//database
// const Database = require("./database");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    // useCreateIndex:true
}
).then(() => console.log('connection established!'))
.catch((err) => { console.log(err)
});
//initialization
const OurAPP = express();

OurAPP.use(express.json());

//microservices
OurAPP.use("/book", Book);
OurAPP.use("/author", Author);
OurAPP.use("/publication", Publication);

OurAPP.get("/", (request, response) => {
response.json({message: "Server is Working!!!..."});
});

//------------------------------------------------------------------------------------------------------------------------
OurAPP.listen(4000, () => console.log("server is running"));