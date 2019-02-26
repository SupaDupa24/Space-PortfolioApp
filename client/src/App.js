import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
// Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Launch from './components/Launch'
import Footer from './components/Footer'
import SpaceX from './components/SpaceX'
import Nasa from './components/Nasa'
import SpaceXEvents from './components/SpaceXEvents'
import Launches from './components/Launches'



import "./App.css";

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/spaceX/launch/:flight_number" component={Launch} />
            <Route exact path="/spaceX/" component={SpaceX} />
            <Route exact path="/nasa/" component={Nasa} />
            <Route exact path="/spaceXEvents/" component={SpaceXEvents} />
            <Route exact path="/spaceXLaunches/" component={Launches} />
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
