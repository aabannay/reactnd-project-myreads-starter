import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from './BooksAPI'
import { search } from './BooksAPI'
import Book from './Book'
class SearchBooks extends Component {


  state = {
    query: '',
    books: []
  };

  updateQuery = (query) => (
    this.setState({query: query.trim()}),
    this.getBooks(query)
  )

  getBooks = (query) => (
    search(query)
    .then( (response) => (
      this.setState({books: response})
    )).catch((err) => (
      this.setState({books: []})
    ))
  )
  render() {
    const {query, books, error} = this.state
    console.log({query})
    console.log({books})
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
            {this.state.books.map((book) => (
              <li >
                <Book book={book}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
