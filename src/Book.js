import React, { Component } from 'react';

class Book extends Component {

  render() {
    const styling = {
      width: 128,
      height: 193,
      backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`
    };

    const authors = this.props.book.authors || '';

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style= {styling}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf}
                      onChange={(event) => this.props.moveBook(this.props.book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
    )
  }
}

export default Book;
