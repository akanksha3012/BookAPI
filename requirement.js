/*
Requirements

Book
-ISBN             -String
(international standard book no.)           
-Title            -String
-Author           -[Number]
-Language         -String
-Publications     -Number
-NumOfPages       -Number
-Categories       -Number

Author
-id             -Number
-name           -String
-books          -[String]

Publications
-id             -Number
-name           -String
-books          -[String]


----------APIs----------

Book
-GET
    -to get all books 
    -to get specific book
    -to get list of all books based on category
    -to get list of books based on author

-POST
    -to add new book

-PUT
    -to update book details
    -to update /add new authors

-DELETE
    -to delete a book
    -to delete an author from book

Authors
-GET
    -to get all author
    -to get specific author
    -to list of author based on a book    ----------do

-POST
    -to add new author

-PUT
    - to update author details
    -to update /add new authors
    
-DELETE
     -to delete a book
    -to delete an author from book

Publications
-GET
    -to get all publication         
    -to get specific publication         
    -to list of publication based on a book      ----------do

-POST
    -to add new publication

-PUT
    - to update publication details
    -to update /add new authors
    
-DELETE
     -to delete a book from publication
    -to delete a publication

*/