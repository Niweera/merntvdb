import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearData } from "./actions/itemActions";
import { Provider } from "react-redux";

import "./App.css";

import Header from "./components/layout/Header";
import Dashboard from "./components/items/Dashboard";
import InputForm from "./components/items/InputForm";
import Help from "./components/pages/Help";
import Dmca from "./components/pages/Dmca";
import NotFound from "./components/pages/NotFound";
import SeeNotes from "./components/pages/SeeNotes";
import EditForm from "./components/items/EditForm";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";

import store from "./store";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current data
    store.dispatch(clearData());
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/add" component={InputForm} />
              <Route exact path="/edit/:id" component={EditForm} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/dmca" component={Dmca} />
              <Route exact path="/seenotes" component={SeeNotes} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
