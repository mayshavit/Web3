var ViewModel = function() {
            var self = this; // make 'this' available to subfunctions or closures
            self.books = ko.observableArray();// enables data binding
            var booksUri ="/api/ books";
            function getAllBooks() {
                $.getJSON(booksUri).done(function(data) {
                        self.books(data);
                    });
            }
            // Fetch the initial data
            getAllBooks();
        };
ko.applyBindings(new ViewModel());
// sets up the data binding