import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Header, /* Footer */ } from "./layouts";
import Authors from "./authors";
import { Register, Login } from "./users";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/select-author" exact component={Authors} />
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

export default App;
