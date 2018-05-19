import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from './BooksAPI'
import { search } from './BooksAPI'
import Book from './Book'
import App from './App'
class SearchBooks extends Component {


  state = {
    query: '',
    booksSearched: [],
    shelvedBooks: []
  };

  updateQuery = (query) => (
    this.setState({query: query}),
    this.getBooks(query)
  )

  getBooks = (query) => (
    search(query)
    .then( (response) => {
      if (response.error) { //when the returned object contains error! no books
        this.setState({booksSearched: []})
      } else {
        this.setState({booksSearched: response})
      }
    }).catch((err) => (
      this.setState({booksSearched: []})
    ))
  )

  setShelves = () => {
    const booksOnShelves = this.props.books;
    const booksSearched = this.state.booksSearched;
    let isBookShelved = false;

    let currentShelf = ''
    if (booksOnShelves.length > 0 && booksSearched.length > 0) {
      for (let aBook of booksSearched) {
        for (let shelvedBook of booksOnShelves) {
          if (aBook.id === shelvedBook.id) {
            isBookShelved = true;
            currentShelf = shelvedBook.shelf;
            break;
          }
        }
        if(isBookShelved) {
          aBook.shelf = currentShelf;
          isBookShelved = false;
        } else {
          aBook.shelf = 'none';
        }
      }
    }
  }


  render() {
    this.setShelves()
    const {query, booksSearched, shelvedBooks} = this.state
    // console.log({query})
    console.log({booksSearched})
    // console.log({shelvedBooks})

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksSearched.map((book) => (
              <li key={book.id}>
                <Book book={book} moveBook={this.props.moveBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
