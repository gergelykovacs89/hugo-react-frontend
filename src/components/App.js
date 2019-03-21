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
              <Route path="/select-author" exact component={Authors} />
              <Route path="/create-author" exact component={CreateAuthor} />
              <Route path="/edit-author/:id" exact component={EditAuthor} />
              <Route path="/a/:id" exact component={AuthorDetail} />
              <Route path="/s/create" exact component={CreateStory} />
              <Route path="/sw/:id" exact component={StoryWriter} />
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
