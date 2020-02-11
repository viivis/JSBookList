const form = document.querySelector('#task-form');
const authorInput = document.querySelector('#author');
const titleInput = document.querySelector('#title');
const bookList =document.querySelector('.collection'); //. klassi puhul, id puhul #
const clearBtn = document.querySelector('.clear-books');


loadEventListeners();

function loadEventListeners(){
    //get books from local storage on load
    document.addEventListener('DOMContentLoaded', getBooks);
    //add a book to ui and local storage
    form.addEventListener('submit', addBook);
    bookList.addEventListener('click', removeBook);
    clearBtn.addEventListener('click', clearBooks);
}
function getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(book => {
        //for each task from books array - create a li element
        const li= document.createElement('li');
        //add class name to the li element
        li.className = 'collection-item';
        //create a text-node and append it to the li
        li.appendChild(document.createTextNode("Title:" + " " + book.titleInput + " " + "Author:" + " " + book.authorInput ));
        //create a anchor tag
        const removeLink = document.createElement('a');
        //add a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML ='X';
        li.appendChild(removeLink);

        //add li element to the ul element
        bookList.appendChild(li);


    });

}


function addBook(event){ //event on tegelikut sumbit, ehk  sündmus
    if(authorInput.value ===''|| titleInput.value === ''){
        alert('Author and the title of the book are required fields!');
    }
    
//create a li element
const li = document.createElement('li');
li.className = 'collection-item';
//assign a class name to html element
li.className = 'collect-item';
//add text content to the li element
li.appendChild(document.createTextNode("Title:" +" " + titleInput.value + " " + "Author:" + " " + authorInput.value ));
//create a anchor tag
const removeLink = document.createElement('a');
//add a class name to the removeLink element
removeLink.className = 'delete-item secondary-content';
removeLink.innerHTML ='X';
li.appendChild(removeLink);
//add li element to the ul element
bookList.appendChild(li);

//store the book in local storage
storeInLocalStorage(authorInput.value, titleInput.value);

authorInput.value = '';
titleInput.value = '';
event.preventDefault();
}

function storeInLocalStorage(author, title){
    let bookz=[];
    const book ={
       
        authorInput: author,
        titleInput: title
    }
//declare an array to read from local storage

if(localStorage.getItem('books') === null){
    bookz= [];
}else{
    bookz = JSON.parse(localStorage.getItem('books'));

}
//add the user's book to books array
bookz.push(book);
localStorage.setItem('books', JSON.stringify(bookz));

}


function removeBook(event){
    //check if the area clicked contains a .delete-item element
    if(event.target.classList.contains('delete-item')){
       if(confirm('Are you sure you want to delete the task?')){
        //remove the entire li element
        event.target.parentElement.remove();


        //Remove local storage
        removeFromLocalStorage(event.target.parentElement);
       }

    }

}
function removeFromLocalStorage(bookItem){
    let books;
    if(localStorage.getItem('books') === null){
        books=[];
    }else {
        books=JSON.parse(localStorage.getItem('books'));
    }
	
	//html element to text
	let bookAsText = bookItem.textContent;
	let title = bookAsText.split("Title: ").pop().split(" Author")[0];
	let indexOfBookToBeRemoved = null;

	for(i = 0; i < books.length; i++){
		if(books[i].titleInput === title){
			indexOfBookToBeRemoved = i;
		}
	}
	
	if(indexOfBookToBeRemoved !== null ) {
		books.splice(indexOfBookToBeRemoved, 1);
	}
	
	
    localStorage.setItem('books', JSON.stringify(books));
}


function clearBooks(){
    //removing elements with while loop and removeChild
    while(bookList.firstChild){
        bookList.removeChild(bookList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}