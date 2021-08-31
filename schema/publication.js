const mongoose = require('mongoose');

// create a Publication schema
const PublicationSchema = mongoose.Schema({
id:{
    type: Number,
    required: true,
},
name: {
    type: String,
    required: true,
},
books: [String],
});

//Author model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;