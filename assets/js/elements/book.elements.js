/**
 * Book Elements Processing
 * Entropy Is Software Development
 * Generates Book Articles from data in assets/data/books.json
 */

$("<h2>", {
    html: "Avalible Now:"
}).appendTo(".avalible")

$("<h2>", {
    html: "Upcoming:"
}).appendTo(".upcoming")

$.getJSON(`assets/data/books.json`, function(data){
    var releasedBooks = [];
    var upcomingBooks = [];
    
    $.each(data.released, function(index, book){
        var description = ``

        $.each(book.description, function(index, line){
            description = description + `<p>` + line + `</p>`
        });

        releasedBooks.push(
              `<header><h3>` + book.title + `</h3></header>`
            + `<img src="images/books/` + book.image_file_name + `" alt="` + book.title + ` by ` + book.author + ` Cover Image" />`
            + `<aside>Avalible online and at good Bookstore Near You!</aside>`
            + `<aside>` + description + `</aside>`
        )
    });

    $.each(data.upcoming, function(index, book){
        var description = ``

        $.each(book.description, function(index, line){
            description = description + `<p>` + line + `</p>`
        });
        
        upcomingBooks.push(
              `<header><h3>` + book.title + `</h3></header>`
            + `<img src="images/books/` + book.image_file_name + `" alt="` + book.title + ` by ` + book.author + ` Cover Image" />`
            + `<aside>` + description + `</aside>`
        )
    });

    $.each(releasedBooks, function(index, book){
        $(`<article>`, {
            html: book
        }).appendTo(`.avalible`)
    });

    $.each(upcomingBooks, function(index, book){
        $(`<article>`, {
            html: book
        }).appendTo(`.upcoming`)
    });


});