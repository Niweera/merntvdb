import React, { Component } from "react";
import Items from "./Items";
import Filtered from "./Filtered";
import Fearless from "./Fearless";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Filtered />
        <Items />
        <Fearless />
      </div>
    );
  }
}

export default Dashboard;
