import React, { Component } from 'react';
import BookShelf from './BookShelf'

class BookList extends Component {

  render() {
    const books = this.props.books;
    const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading');
    const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
    const readBooks = books.filter((book) => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Currently Reading' books={currentlyReadingBooks} moveBook={this.props.moveBook}/>
            <BookShelf title='Want to Read' books={wantToReadBooks} moveBook={this.props.moveBook}/>
            <BookShelf title='Read' books={readBooks} moveBook={this.props.moveBook}/>
          </div>
        </div>
      </div>
    )
  }
}

export default BookList;
