const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
      users.push({"username":username,"password":password});
   
  }
  return res.status(200).json({message: "User successfully registred. Now you can login"});

  //return res.status(404).json({message: "Unable to register user."});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  console.log("Before calling promise");
  //Call the promise and wait for it to be resolved and then print a message.
  myPromise.then((successMessage) => {
      console.log("From Callback " + successMessage)
    })
  //Console log after calling the promise
    console.log("After calling promise");
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])

  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  for(i=1; i<=10;i++){
      if(books[i].author == author){
          res.send(books[i]);
      }
  }
  //res.send(books[3].author )

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  /*for(i=0; i<10;i++){
      if(books[i].title == title){
          res.send(books[i]);
      }
  }*/
  res.send(books[1].title)
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
