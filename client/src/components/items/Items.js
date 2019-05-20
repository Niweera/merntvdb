import React, { Component } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getAllItems, clearData, clearItem } from "../../actions/itemActions";

class Items extends Component {
  componentDidMount() {
    this.props.getAllItems();
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  render() {
    const { items } = this.props.item;
    if (items !== null) {
      return (
        <div className="container mt-3" id="specialDiv">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-0 col-0" />
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <ul className="list-group" id="tvNames">
                <li
                  className="list-group-item list-group-item-light text-center"
                  id="headerList"
                >
                  TVName
                </li>
                {items.map(item => (
                  <Item
                    key={item._id}
                    uuid={item._id}
                    tvid={item.tvid}
                    tvname={item.tvname}
                    showtype={item.showtype}
                    link={item.link}
                    places={item.place}
                    remarks={item.remarks}
                  />
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-0 col-0" />
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Items.propTypes = {
  getAllItems: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  clearItem: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  item: state.item
});

export default connect(
  mapStateToProps,
  { getAllItems, clearData, clearItem }
)(Items);
