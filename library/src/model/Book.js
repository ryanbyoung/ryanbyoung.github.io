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
    document.getElementById("confirm").innerHTML = keys.length + " books loaded.";
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
  if (!error) document.getElementById("confirm").innerHTML = nmrOfBooks + " books saved.";
};
//  Create a new book row
Book.create = function (slots) {
  var book = new Book(slots);
  Book.instances[slots.isbn] = book;
  document.getElementById("confirm").innerHTML = "Book " + slots.isbn + " added";
};
//  Update an existing book row
Book.update = function (slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt(slots.year);
  if (book.title !== slots.title) { book.title = slots.title; }
  if (book.year !== slots.year) { book.year = year; }
  document.getElementById("confirm").innerHTML = "Book " + slots.isbn + " updated";
};
//  Delete a book row from storage
Book.destroy = function (isbn) {
  if (Book.instances[slots.isbn]) {
    document.getElementById("confirm").innerHTML = "Book " + isbn + " deleted";
    delete Book.instances[isbn];
  } else {
    document.getElementById("confirm").innerHTML = "There is no book with ISBN " + isbn + " in the library";
  }
};
//  Create and save test data
Book.createTestData = function () {
  Book.instances["1491949465"] = new Book({isbn:"1-4919-4946-5", title:"Learning PHP, MySQL, JavaScript, CSS & HTML5", year:2014});
  Book.instances["006251587X"] = new Book({isbn:"0-0625-1587-X", title:"Weaving the Web", year:2000});
  Book.instances["0321965515"] = new Book({isbn:"0-3219-6551-5", title:"Don't Make Me Think", year:2014});
  Book.instances["0134291255"] = new Book({isbn:"0-1342-9125-5", title:"PHP for the Web", year:2016});
  Book.instances["0596517742"] = new Book({isbn:"0-5965-1774-2", title:"JavaScript: The Good Parts", year:2008});
  Book.saveAll();
};
//  Clear data
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage.setItem("books", "{}");
    document.getElementById("confirm").innerHTML = "All books removed from library."
  }
};
