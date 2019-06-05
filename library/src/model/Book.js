function Book(slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
};

Book.instances = {};

// Convert row to object
Book.convertRow2Obj = function (bookRow) {
  var book = new Book(bookRow);
  return book;
};
// Load the book table from Local Storage
Book.loadAll = function () {
  var key="", keys=[], booksString="", books={}, i=0;  
  try {
    if (localStorage.getItem("books")) {
      booksString = localStorage.getItem("books");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString) {
    books = JSON.parse(booksString);
    keys = Object.keys(books);
    document.getElementById("confirm").innerHTML = "There are " + keys.length + " books in The Library.";
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj(books[key]);
    }
  }
};
//  Save all book objects to Local Storage
Book.saveAll = function () {
  var booksString="", error=false,
      nmrOfBooks = Object.keys(Book.instances).length;  
  try {
    booksString = JSON.stringify(Book.instances);
    localStorage.setItem("books", booksString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) document.getElementById("confirm").innerHTML = nmrOfBooks + " books have been added to The Library.";
};
//  Create a new book row
Book.create = function (slots) {
  var book = new Book(slots);
  Book.instances[slots.isbn] = book;
  document.getElementById("confirm").innerHTML = "The book with the ISBN " + slots.isbn + " was added to The Library.";
};
//  Update an existing book row
/*Book.update = function (slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt(slots.year);
  if (book.title !== slots.title) { book.title = slots.title; }
  if (book.year !== slots.year) { book.year = year; }
  document.getElementById("confirm").innerHTML = "Book " + slots.isbn + " updated.";
};*/
//  Delete a book row from storage
Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    document.getElementById("confirm").innerHTML = "Book " + isbn + " was deleted.";
    delete Book.instances[isbn];
  } else {
    document.getElementById("confirm").innerHTML = "Sorry, there is no book with the ISBN " + isbn + " in The Library.";
  }
};
//  Create and save test data
Book.createTestData = function () {
  Book.instances["1491949465"] = new Book({isbn:"1491949465", title:"Learning PHP, MySQL, JavaScript, CSS & HTML5", year:2014});
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0321965515"] = new Book({isbn:"0321965515", title:"Don't Make Me Think", year:2014});
  Book.instances["0134291255"] = new Book({isbn:"0134291255", title:"PHP for the Web", year:2016});
  Book.instances["0596517742"] = new Book({isbn:"0596517742", title:"JavaScript: The Good Parts", year:2008});
  Book.saveAll();
};
//  Clear data
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage.setItem("books", "{}");
    document.getElementById("confirm").innerHTML = "All books have been removed from The Library."
  }
};
