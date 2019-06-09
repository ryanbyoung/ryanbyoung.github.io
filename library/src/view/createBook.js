pl.view.createBook = {
  setupUserInterface: function () {
    var saveButton = document.forms['Book'].commit;
    var link = document.getElementById("link");
    // load all book objects
    Book.loadAll();
    // Set an event handler for the save/submit button
    saveButton.addEventListener("click", 
      pl.view.createBook.handleSaveButtonClickEvent);
    link.addEventListener("click", function () {
      Book.saveAll(); 
    });
  },
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Book'];
    var required = document.getElementById("required");
    if (formEl.isbn.value != "") {
      var slots = { 
        isbn: formEl.isbn.value, 
        title: formEl.title.value, 
        year: formEl.year.value
      };
      Book.create(slots);
      formEl.reset();
      required.innerText = "";
    }
    else {
      formEl.isbn.focus();
      required.innerText = "ISBN is required";
    }
  }
};
