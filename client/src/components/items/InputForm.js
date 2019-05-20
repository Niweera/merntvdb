import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addItem,
  getLastTvid,
  clearData,
  clearErrors
} from "../../actions/itemActions";
import PropTypes from "prop-types";

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      tvid: "",
      tvname: "",
      showtype: "",
      place: "",
      link: "",
      remarks: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getLastTvid();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  getTvid() {
    const { lastTvid } = this.props.item;
    if (lastTvid) {
      return lastTvid;
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { tvid, tvname, place, showtype, remarks, link } = this.state;

    const newItem = {
      tvid: tvid,
      tvname: tvname,
      place: place,
      showtype: showtype,
      remarks: remarks,
      link: link
    };

    this.props.addItem(newItem, this.props.history);
  }

  render() {
    const { tvid, tvname, showtype, place, link, remarks, errors } = this.state;

    return (
      <div className="container">
        <div className="container mt-2">
          <h1
            className="text-center"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,.5)", color: "white" }}
          >
            Insert Records
          </h1>
        </div>
        <div className="jumbotron bg-dark mt-4 pt-3 pb-1">
          <form onSubmit={this.onSubmit}>
            <div className="row form-group">
              <div className="col-md-2">
                <input
                  type="number"
                  className={classnames("form-control", {
                    "is-invalid": errors.tvid
                  })}
                  placeholder="TVID"
                  name="tvid"
                  value={tvid}
                  onChange={this.onChange}
                />
                {errors.tvid && (
                  <div className="invalid-feedback">{errors.tvid}</div>
                )}
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.tvname
                  })}
                  placeholder="TVName"
                  name="tvname"
                  value={tvname}
                  onChange={this.onChange}
                />
                {errors.tvname && (
                  <div className="invalid-feedback">{errors.tvname}</div>
                )}
              </div>
              <div className="col-md-3">
                <select
                  className={classnames("form-control", {
                    "is-invalid": errors.showtype
                  })}
                  name="showtype"
                  value={showtype}
                  onChange={this.onChange}
                >
                  <option value="" disabled>
                    Select ShowType
                  </option>
                  <option value="Completed">Completed</option>
                  <option value="Airing">Airing</option>
                  <option value="Break">Break</option>
                </select>
                {errors.showtype && (
                  <div className="invalid-feedback">{errors.showtype}</div>
                )}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-6">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.link
                  })}
                  placeholder="Wikipedia Link"
                  name="link"
                  value={link}
                  onChange={this.onChange}
                />
                {errors.link && (
                  <div className="invalid-feedback">{errors.link}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.place
                  })}
                  placeholder="Place [Enter Comma Seperated] Ex: l S01 S02, p S03 S03"
                  name="place"
                  value={place}
                  onChange={this.onChange}
                />
                <small className="form-text text-white">
                  [Enter Comma Seperated] Ex: l S01 S02, p S03 S03
                </small>
                {errors.place && (
                  <div className="invalid-feedback">{errors.place}</div>
                )}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Remarks"
                  name="remarks"
                  value={remarks}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-control bg-info border-info text-dark">
                  Last TVID
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fetching..."
                  defaultValue={this.getTvid()}
                  name="lasttvid"
                  disabled
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4" />
              <div className="col-md-4">
                <input
                  type="submit"
                  value="Insert New Record"
                  className="btn btn-success btn-block"
                />
              </div>
              <div className="col-md-4" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

InputForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  getLastTvid: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
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
  { addItem, getLastTvid, clearData, clearErrors }
)(withRouter(InputForm));
