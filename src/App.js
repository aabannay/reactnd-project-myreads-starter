import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Book from './Book'
import BookShelf from './BookShelf'
import BookList from './BookList'
import { getAll } from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    new: false
  }

 componentDidMount() {
   this.setState({new: true})
 }

  render() {
    if (this.state.new) {
      getAll().then((response) => (
        this.setState({books: response})
      )).catch(
        this.setState({books: []}),
        this.setState({new: false})
      );
    }
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>
        <Route exact path="/" render={() => (
          <BookList books={this.state.books} title='My Read'/>
        )}/>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
