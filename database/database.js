const books =[
    {
    ISBN:"12345book",
    title:"tesla",
    pubdate:"2021-08-05",
    language:"en",
    numpage:"250",
    author:[1,2],
    publication:[1],
    category:["tech","space","education"],
    }
]

const author =[
    {
        id:1,
        name:"aradhana",
        books:["12345book","secretbook"]

    },

    {
        id:2,
        name:"elon musk",
        books:["12345book"]
    }
]

const publication =[
    {
        id:1,
        name:"writex",
        books:["12345book"]
    }
]

module .exports = {books,author,publication};// this says this module exports the contenrt
                                             // between the parenthesis
 
