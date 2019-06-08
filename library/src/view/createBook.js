pl.view.createBook = {
  setupUserInterface: function () {
    var saveButton = document.forms['Book'].commit;
    // load all book objects
    Book.loadAll();
    // Set an event handler for the save/submit button
    saveButton.addEventListener("click", 
      pl.view.createBook.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
      Book.saveAll(); 
    });
  },
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Book'];
    if (formEl.isbn.value != "") {
      var slots = { 
        isbn: formEl.isbn.value, 
        title: formEl.title.value, 
        year: formEl.year.value
      };
      Book.create(slots);
      formEl.reset();
      document.getElementByID("required").innerText = "";
    }
    else {
      formEl.isbn.focus();
      document.getElementByID("required").innerText = "ISBN is required";
    }
  }
};
