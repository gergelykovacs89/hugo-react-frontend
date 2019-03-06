import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Footer } from "./layouts";
import Authors from "./authors";
import { Register } from "./users";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/select-author" exact component={Authors} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
