import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListBookComponent from "./components/ListBookComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateBookComponent from "./components/CreateBookComponent";
import ViewBookComponent from "./components/ViewBookComponent";

function App() {
  return (
    <>
      <Router>
        <HeaderComponent />

        <div className="container">
          <Switch>
            <Route exact path="/" component={ListBookComponent}></Route>
            <Route
              exact
              path="/api/v1/books"
              component={ListBookComponent}
            ></Route>
            <Route
              exact
              path="/api/v1/add-book/:id"
              component={CreateBookComponent}
            ></Route>
            <Route
              exact
              path="/api/v1/view-book/:id"
              component={ViewBookComponent}
            ></Route>
          </Switch>
        </div>
        <div>
          <FooterComponent />
        </div>
      </Router>
    </>
  );
}

export default App;
