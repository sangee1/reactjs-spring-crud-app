import React, { Component } from "react";
import BookService from "../services/BookService";
import { withRouter } from "react-router-dom";

class ListBookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.addBook = this.addBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.viewBook = this.viewBook.bind(this);
  }

  componentDidMount() {
    BookService.getBooks().then((res) => {
      this.setState({ books: res.data });
    });
  }

  addBook() {
    console.log("Add Book");
    this.props.history.push("/api/v1/add-book/_add");
  }

  updateBook(id) {
    console.log("Update Book");
    this.props.history.push(`/api/v1/add-book/${id}`);
  }

  deleteBook(id) {
    BookService.deleteBook(id).then((res) => {
      this.setState({
        books: this.state.books.filter((book) => book.id !== id),
      });
      //this.props.history.push("/api/v1/books");
    });
  }

  viewBook(id) {
    this.props.history.push(`/api/v1/view-book/${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Books List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addBook}>
            Add Book
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>
                    <button
                      onClick={() => this.updateBook(book.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteBook(book.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewBook(book.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ListBookComponent);
