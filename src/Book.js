import React, { Component } from 'react';

class Book extends Component {

  setThumbnail = () => {
    let result = 'none'
    if (this.props.book.imageLinks) {
      if (this.props.book.imageLinks.thumbnail) {
        result = `url("${this.props.book.imageLinks.thumbnail}")`
      }
    }
    return result;
  }

  render() {
    const styling = {
      width: 128,
      height: 193,
      backgroundImage: this.setThumbnail()
    };


    const authors = this.props.book.authors || '';

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style= {styling}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf}
                      onChange={(event) => this.props.moveBook(this.props.book, event.target.value)}>
                <option value="" disabled>Move to...</option>
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
