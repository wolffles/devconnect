import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' // basically allows us to do things like hit the back button and forward buttons
// Route for creating individual routes, and Renamed browserrouter as Router
import { Provider } from 'react-redux'
import store from './store'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
