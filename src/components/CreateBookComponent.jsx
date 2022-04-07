import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BookService from "../services/BookService";

class CreateBookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      author: "",
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      console.log("ComponentDidMount");
      BookService.getBookById(this.state.id).then((res) => {
        let book = res.data;
        console.log("book is ", book);
        this.setState({
          name: book.name,
          author: book.author,
        });
      });
    }
  }

  saveOrUpdateBook = (event) => {
    event.preventDefault();
    let book = { name: this.state.name, author: this.state.author };
    console.log("book : " + JSON.stringify(book));
    if (this.state.id === "_add") {
      BookService.addBook(book).then((res) => {
        this.props.history.push("/api/v1/books");
      });
    } else {
      //this is for update as an id is present
      BookService.updateBook(book, this.state.id).then((res) => {
        this.props.history.push("/api/v1/books");
      });
    }
  };

  cancel = () => {
    this.props.history.push("/api/v1/books");
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value });
  };

  getFormTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Book</h3>;
    } else {
      return <h3 className="text-center">Update Book</h3>;
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getFormTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Book Title:</label>
                    <input
                      name="name"
                      placeholder="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Book Author:</label>
                    <input
                      name="author"
                      placeholder="author"
                      className="form-control"
                      value={this.state.author}
                      onChange={this.handleAuthorChange}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateBook}
                  >
                    Add{" "}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateBookComponent);
