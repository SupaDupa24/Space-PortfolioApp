import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
// Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
