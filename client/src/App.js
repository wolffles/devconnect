import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' // basically allows us to do things like hit the back button and forward buttons
// Route for creating individual routes, and Renamed browserrouter as Router
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from './components/create-profile/AddExperience'
import AddEducation from "./components/create-profile/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";

import "./App.css";

//check for token
if(localStorage.jwtToken) {
  //Set auth toekn header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded= jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenicated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} /> 
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
            <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>;
  }
}

export default App;
