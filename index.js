
require("dotenv").config();//this is for .env file

const express= require("express");
var bodyparser= require("body-parser");//body  parser is in node m
                                    //modules and is used for post operation

//databse

const mongoose =require("mongoose");

const database =require("./database/database");//using ./ means that databse is inthe same file

const bookmodel = require("./database/books");

const authormodel = require("./database/author");
const publicationmodel = require("./database/publication");



const booky =express();  //initalize express

booky.use(bodyparser.urlencoded({extended:true}));//bodyparser allows express to  read the body and parse it into json object.so that we as well as machine can understand it
                                       //urlencoded(etented true) mean that request which we are passing will contain any type of values)

booky.use (bodyparser.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(()=>console.log("connection established"));//this atatement is printed after mongoose is connected
//by then() function




/*  
 route  /
 description- get all teh bboks
 access - public 
 parameter -none
 method - get 
*/

booky.get("/", async (req,res) => { //here route is the root route

    const getallbooks= await bookmodel.find();

    return res.json(getallbooks);

});



/*  
 route  /is
 description- get specific book on isbn
 access - public 
 parameter -isbn
 method - get 
*/

booky.get("/is/:isbn",  async (req,res) => { 
    
    
    const getspecificbook=await bookmodel.findOne({ISBN:req.params.isbn});//find one finds only one iten return that while find() 
                                                                      //all and return all
/*
    const getspecificbook=database.books.filter(
        (book) => book.ISBN ===req.params.isbn
    );
*/
    if (!getspecificbook)//this means when getspwcificbook is not 0  (!0=1)
    { 
        return res.json({error:`no book is found for isbn of ${req.params.isbn}`}) //$sign is used to show 
                                                        //values which are changing dynamically.
    }
    
    return res.json({books: getspecificbook});

});



/*  
 route  /c
 description- get specific book on category
 access - public 
 parameter -category
 method - get 
*/

booky.get("/c/:category", async (req,res) => { 
    

    const getspecificbook=await bookmodel.findOne({category:req.params.category});

    if (!getspecificbook){
        return res.json({error:`no book is found for category of ${req.params.category}`})
    }

    return res.json({books: getspecificbook});

});



/*  
 route  /l/:language
 description- get specific book on language
 access - public 
 parameter -language
 method - get 
*/

booky.get("/l/:language", async (req,res) =>{
    const getspecificbook= await bookmodel.findOne({language:req.params.language});

    if (!getspecificbook){
        return res.json({error:`no bbok found for this language ${req.params.language}`})
    }

    return res.json({books: getspecificbook});
});

/*  
 route  /author
 description- get authors
 access - public 
 parameter -none
 method - get 
*/

booky.get("/author", async (req,res) => { 
    
    const getallauthors=await authormodel.find();
    return res.json(getallauthors);

});

/*  
 route  /author/book
 description- get authors based on books 
 access - public 
 parameter -isbn
 method - get 
*/

booky.get("/author/book/:isbn", (req,res) => { 
    
    const getspecificauthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getspecificauthor.length===0){
        return res.json ({error: `no author found for the book of ${req.params.isbn}` });
    }
    return res.json({authors: getspecificauthor});

});


/*  
 route  /author/id
 description- get authors based on id 
 access - public 
 parameter -isbn
 method - get 
*/

booky.get("/author/:id",(req,res) =>{

    const getspecificauthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if (getspecificauthor==0){
        return res.json({error:`no author found for the id ${req.params.id}`});
    }

    return res.json({authors:getspecificauthor});
    
});


/*  
 route  /publication
 description- get all publications 
 access - public 
 parameter -none
 method - get 
*/

booky.get("/publication", async (req,res) => { 
    const getallpublication = await publicationmodel.find();
    return res.json(getallpublication);

});


/*  
 route  /publication
 description- get  publications based on id 
 access - public 
 parameter -none
 method - get 
*/

booky.get("/publication/:id", async(req,res)=>{
    const getspecificpublication= await publicationmodel.findOne(
        {id:req.params.id}
    );

    if (!getspecificpublication){
        return res.json({error:`no publication found for the given id:${req.params.id}`});
    }

    return res.json({publication: getspecificpublication});

});



/*  
 route  /publication/isbn
 description- get specific publications based on books 
 access - public 
 parameter -books
 method - get 
*/

booky.get("/publication/books/:isbn",(req,res) => {// number of slashes in route have an efffect on 
    //output supoose you want to go inside an arraythen then you have to use 3 slahses 
    //where as n above no array so 2slash was enough
    const getspecificpublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getspecificpublication == 0){
        return res.json({error:`no publication found for the given book:${req.params.isbn}`});
    }
    return res.json({publication: getspecificpublication});

});





//post methods

//YOUR DAatabase wont be updated coz its a local database . but you once have learned the database then it will work




/*  
 route  /book/new
 description- add new books
 access - public 
 parameter -none
 method - push

 
booky.post("/book/new",(req,res)=>{
    const newbook=req.body;

    database.books.push(newbook);

    database.books.forEach((book)=>{
        if(book.ISBN == newbook.ISBN ){ // iget results with ISBN but i dont get results with isbn
            return res.json({error:`book already exist`});
        }

            else{
               return res.json({updatedbooks:database.books});
            }
        

    });

});

*/


booky.post("/book/new", async (req,res)=>{
    const { newbook }=req.body;
    const addnewbook = bookmodel.create(newbook);
        return res.json({
            books: addnewbook,
            message:"book was added "
        });
    });

    

/*  
 route  /author/new
 description- add new author
 access - public 
 parameter -none
 method - post
*/

/*
booky.post("/author/new",(req,res)=>{

    const newauthor=req.body;
    
    database.author.forEach((aut)=>{
        if (aut.id == newauthor.id){
            return res.json({error:`author already exist`});
        }
        else{
            database.author.push(newauthor);
            return res.json({updatedbooks:database.author});
        }
    });
});
*/


booky.post("/author/new", async (req,res)=>{
    const { newauthor }=req.body;

    const addnewauthor=authormodel.create(newauthor);
    return res.json({
        author: addnewauthor,
        message:"author was added"
    });
});


/*  
 route  /publication/new
 description- add new publication
 access - public 
 parameter -none
 method - post
*/


booky.post("/publication/new",async (req,res)=>{
    const {newpublication}=req.body;
    const addnewpublication=publicationmodel.create(newpublication);
    return res.json({
        publication:addnewpublication,
        message:"publication was added"
    });
});





//put method!!!


/*  
 route  /book/author/update
 description- update book and author on isbn
 access - public 
 parameter -isbn
 method - put
*/


booky.put("/book/author/update/:isbn",async (req,res)=>{

    //updated book database
    const updatedbook = await bookmodel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            $addToSet:{
                authors:req.body.newauthor
            }
        },
        {
            new:true
        }
    );


    //update author database

    const updatedauthor = await authormodel.findOneAndUpdate(
        {
            id:req.body.newauthor
        },
        {
            $addToSet:{
                books:req.params.isbn
            }
        },
        {
            new:true
        }
    );

    return res.json({
        books:updatedbook,
        authors:updatedauthor,
        message:"new author was added"
    });
});


/*  
 route  /book/update
 description- update book on isbn
 access - public 
 parameter -none
 method - put
*/


booky.put("/book/update/:isbn",async(req,res)=>{

    const updatedbook= await bookmodel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title:req.body.booktitle
        },
        {
            new:true
        }
);

   return res.json({
    books:updatedbook
    });

});








/*  
 route  /publication/update/new
 description- update or add new publication
 access - public 
 parameter -none
 method - put
*/




booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update publicaation dataBASE
    database.publication.forEach((pub)=>{
        if(pub.id === req.body.pubid)
        {
            return pub.books.push(req.params.isbn);

        }
    });
//update book database

    database.books.forEach((book)=>{
        if(book.isbn === req.params.isbn){
            book.publications=req.body.pubid;
            return;
        }
    });

    return res.json(
        {
        book:database.books,
        publication:database.publication,
        message:"succesfully updated publication"
    });


});

//delete method!!!

/*  
 route  /book/delete
 description- delete a book
 access - public 
 parameter -none
 method - delete
*/


booky.delete("/books/delete/:isbn", async (req,res)=>{
//whichever book does not match the  given isbn ,just send thosse to updated book array and rest will 
//be filtered
const updatedbookdatabase= await bookmodel.findOneAndDelete(
    {
        ISBN:req.params.isbn
    }
);
return res.json({
    books:updatedbookdatabase
    });

});


//delete method!!!
/*  
 route  /book/delete
 description- delete a author
 access - public 
 parameter -none
 method - delete
*/

booky.delete("/author/delete/:id",(req,res)=>{
    
    //whichever auhor does not match the  given id ,
    //just send thosse to updated book array and rest will 
    //be filtered
    const updatedauthordatabase=database.author.filter(
        (author)=>author.id != req.params.id
    )
    database.author = updatedauthordatabase;
    return res.json({author: database.author });
    });
    

//delete method!!!
/*  
 route  /book/delete/author
 description- delete anauthor from books and vice a versa
 access - public 
 parameter -isbn,authorid
 method - delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //Update the book database
     database.books.forEach(
         (book)=>{
       if(book.ISBN === req.params.isbn) {
         const newauthorlist = book.author.filter(
           (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
         );
         book.author = newauthorlist;
         return;
       }
     });


     //Update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;//assigning the new book list to orignal book list
      return;
    }
  });

  return res.json({
    book: database.books,
    author: database.author,
    message: "Author was deleted!!!!"
  });
});


booky.listen(3000,() => {
    console.log("server is up and running");
});


