pl.view.deleteBook = {
  setupUserInterface: function () {
    var deleteButton = document.forms['Book'].commit;
    var selectEl = document.forms['Book'].selectBook;
    var key="", keys=[], book=null, optionEl=null, i=0;
    // load all book objects
    Book.loadAll();
    keys = Object.keys(Book.instances);
    // populate the selection list with books
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectEl.add(optionEl, null);
    }
    deleteButton.addEventListener("click", 
        pl.view.deleteBook.handleDeleteButtonClickEvent);
    document.addEventListener("unload", function () {
        Book.saveAll(); 
    });
  },
  // Event handler for deleting a book
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Book'].selectBook;
    var index = selectEl.options.selectedIndex;
    var isbn = selectEl.value;
    var title = selectEl.options[index].text;
    if (isbn) {
      Book.destroy(isbn, title);
      // remove deleted book from select options
      selectEl.remove(selectEl.selectedIndex);
    }
  }
};
