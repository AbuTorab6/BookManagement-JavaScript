
// DOM
var form = document.querySelector('#book-form');
var getTitle = document.querySelector('#title');
var getAuthor = document.querySelector('#author');
var getIsbn = document.querySelector('#isbn');
var getContainer = document.querySelector('.container');
var bookList = document.querySelector('#book-list');























//class

class Book
{
    title;
    author;
    isbn;

    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}









class UI
{
    constructor()
    {

    }

    static addToBookList(book1)
    {
        var row = document.createElement('tr');

        row.innerHTML = `
        <td>${book1.title}</td>
        <td>${book1.author}</td>
        <td>${book1.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `

        bookList.appendChild(row);
    }

    static showAlert(message , className)
    {
        var div = document.createElement('div');
        div.className = `time ${className}`;
        div.appendChild(document.createTextNode(message));

        getContainer.insertBefore(div,form);


        setTimeout
        (
            function()
            {
                document.querySelector('.time').remove();
            },
            2000
        );

    }

    static deleteBook(p1)
    {
        if(p1.target.hasAttribute('href'))
        {
            var parnt = p1.target.parentElement.parentElement;
            parnt.remove();

            Store.removeBook(p1.target.parentElement.previousElementSibling.textContent.trim());
        }
    }

}














class Store
{
    static getBook()
    {
        var books;

        if(localStorage.getItem('books')==null)
        {
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }



    static addBook(book1)
    {
        var books = Store.getBook();

        books.push(book1);

        localStorage.setItem('books' , JSON.stringify(books));
    }



    static displayBook()
    {
        var books = Store.getBook();

        books.forEach
        (
            function(p1)
            {
                UI.addToBookList(p1);
            }
        );
    }


    static removeBook(isbn)
    {
        var books = Store.getBook();

        books.forEach
        (
            function(p1,p2)
            {
                if(p1.isbn == isbn)
                {
                    books.splice(p2,1);
                }
            }
        );
        localStorage.setItem('books' , JSON.stringify(books));
    }


    
}











//add event listener
form.addEventListener('submit' , newBook);
bookList.addEventListener('click' , removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());




//define function 
function newBook(p1)
{
    var title = getTitle.value;
    var author = getAuthor.value;
    var isbn = getIsbn.value;

    


    if(title==='' || author==='' || isbn==='')
    {
        UI.showAlert("please fill all the fields" , "error")
    }
    else
    {
        var book1 = new Book(title,author,isbn);
    
        UI.addToBookList(book1);

        UI.showAlert("Book Added" , "success");

        Store.addBook(book1);

        getTitle.value = "";
        getAuthor.value = "";
        getIsbn.value = "";

        
    }


    

    p1.preventDefault();

}













function removeBook(p1)
{
    var p1 = p1;

    
    UI.deleteBook(p1);

    UI.showAlert("Book Deleted successfully" , "success");

    
}