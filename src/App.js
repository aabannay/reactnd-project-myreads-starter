import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookList from './BookList'
import { getAll } from './BooksAPI'
import { update } from './BooksAPI'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  }

 componentDidMount() {
   getAll().then((response) => (
     this.setState({books: response})
   )).catch(
     this.setState({books: []}),
   );
 }

 moveBook = (book, shelf) => {
   update(book, shelf)
   .then(() => {
     let booksOnShelves = this.state.books;
     let isBookShelved = false;

     for (let aBook of booksOnShelves) {
       if (aBook.id === book.id) {
         isBookShelved = true;
         break;
       }
     }

     if (shelf === 'none') { //book removed from shelves
       booksOnShelves = booksOnShelves.filter(aBook => aBook.id !== book.id);
     } else if (isBookShelved) { //book already shelved
       book.shelf = shelf;
     } else { //book was not shelved and is going to be shelved
       book.shelf = shelf;
       booksOnShelves.push(book);
     }
     //update the shelves
     this.setState({
       books: booksOnShelves
     })
   })
 }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} moveBook={this.moveBook}/>
        )}/>
        <Route exact path="/" render={() => (
          <BookList books={this.state.books}
           title='My Read'
           moveBook={this.moveBook}/>
        )}/>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
