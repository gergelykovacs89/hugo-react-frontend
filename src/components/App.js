import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Header /* Footer */ } from "./layouts";
import Authors from "./authors";
import CreateAuthor from "./authors/CreateAuthor";
import { Register, Login } from "./users";
import history from "../history";
import { loginRequest } from "../actions";
import { connect } from "react-redux";
import EditAuthor from "./authors/EditAuthor";
import AuthorDetail from "./authors/AuthorDetail";
import CreateStory from "./story/CreateStory";
import StoryWriter from "./story/StoryWriter";
import Immutable from "immutable";
import EditStory from "./story/EditStory";
import { PrivateRoute } from "./PrivateRoute";

// See more: https://github.com/facebook/draft-js/issues/950
Immutable.Iterable.noLengthWarning = true;

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      this.props.loginRequest(null);
    }
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <PrivateRoute path="/select-author" exact component={Authors} />
              <PrivateRoute path="/create-author" exact component={CreateAuthor} />
              <PrivateRoute path="/edit-author/:id" exact component={EditAuthor} />
              <Route path="/a/:id" exact component={AuthorDetail} />
              <PrivateRoute path="/s/create" exact component={CreateStory} />
              <PrivateRoute path="/s/update/:id" exact component={EditStory} />
              <PrivateRoute path="/sw/:id" exact component={StoryWriter} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </Router>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

const mapStateToPros = state => {
  return {};
};

export default connect(
  mapStateToPros,
  { loginRequest }
)(App);
