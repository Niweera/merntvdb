import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Item extends Component {
  state = {
    showInfo: false
  };

  render() {
    const { uuid, tvid, tvname, link, showtype, places, remarks } = this.props;
    const { isAuthenticated } = this.props.auth;
    let seeNotes = false;
    if (remarks && remarks === "See Notes") {
      seeNotes = true;
    } else {
      seeNotes = false;
    }
    const { showInfo } = this.state;
    return (
      <li
        className="list-group-item list-group-item-dark text-left mt-1"
        id="mainBlock"
      >
        <a href={link} rel="noopener noreferrer" target="_blank">
          {tvname}
        </a>{" "}
        <i
          onClick={() => this.setState({ showInfo: !this.state.showInfo })}
          className="fas fa-sort-down"
          style={{ color: "white", cursor: "pointer" }}
        />
        {isAuthenticated ? (
          <Link to={`/edit/${uuid}`}>
            <i
              className="fas fa-pencil-alt"
              style={{
                cursor: "pointer",
                float: "right",
                marginRight: "1rem",
                color: "white"
              }}
            />
          </Link>
        ) : null}
        {showInfo ? (
          <div className="container mt-3 mb-2">
            <div className="row">
              <div className="col-md-3 px-1  text-center">
                <div className="list-group-item list-group-item-info text-center">
                  TVID
                </div>
              </div>
              <div className="col-md-3 px-1 text-center">
                <div className="list-group-item list-group-item-light text-center">
                  {tvid}
                </div>
              </div>
              <div className="col-md-3 px-1 text-center">
                <div className="list-group-item list-group-item-warning text-center">
                  ShowType
                </div>
              </div>
              <div className="col-md-3 px-1 text-center">
                <div className="list-group-item px-0 list-group-item-light text-center">
                  {showtype}
                </div>
              </div>
            </div>
            {places.map(place => (
              <div key={place.toString()} className="row mt-1">
                <div className="col-md-4 px-1  text-center">
                  <div className="list-group-item list-group-item-light text-center">
                    {place.split(" ")[0]}
                  </div>
                </div>
                <div className="col-md-4 px-1  text-center">
                  <div className="list-group-item list-group-item-light text-center">
                    {place.split(" ")[1]}
                  </div>
                </div>
                <div className="col-md-4 px-1  text-center">
                  <div className="list-group-item list-group-item-light text-center">
                    {place.split(" ")[2]}
                  </div>
                </div>
              </div>
            ))}
            {remarks && seeNotes === true && (
              <div className="row mt-1">
                <div className="col-md-12 px-1 text-center">
                  <div className="list-group-item list-group-item-light text-center">
                    <Link to={`seenotes`} style={{ color: "#818182" }}>
                      See Notes
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {remarks && seeNotes === false && (
              <div className="row mt-1">
                <div className="col-md-12 px-1 text-center">
                  <div className="list-group-item list-group-item-light text-center">
                    {remarks}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </li>
    );
  }
}

Item.propTypes = {
  auth: PropTypes.object.isRequired,
  uuid: PropTypes.string.isRequired,
  tvid: PropTypes.number.isRequired,
  tvname: PropTypes.string.isRequired,
  showtype: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Item);
