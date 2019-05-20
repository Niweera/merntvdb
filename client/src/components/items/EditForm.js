import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import {
  getItemById,
  clearData,
  clearErrors,
  updateItem
} from "../../actions/itemActions";

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      tvid: "",
      tvname: "",
      showtype: "",
      place: "",
      link: "",
      remarks: "",
      errors: {},
      success: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { tvid, tvname, place, showtype, remarks, link } = this.state;
    const id = this.props.match.params.id;

    const editItem = {
      id: id,
      tvid: String(tvid),
      tvname: tvname,
      place: place,
      showtype: showtype,
      remarks: remarks,
      link: link
    };

    this.props.updateItem(editItem);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (
      nextProps.item.item === null &&
      this.props.item.loading &&
      this.props.item.noredirect
    ) {
      this.props.history.push("/");
    }

    if (nextProps.item.item) {
      const item = nextProps.item.item;

      // Bring place array back to CSV
      const placeArray = item.place.join(", ");

      // Set component fields state
      const { tvid, tvname, showtype, link, remarks } = item;
      this.setState({
        tvid: tvid,
        tvname: tvname,
        place: placeArray,
        showtype: showtype,
        remarks: remarks,
        link: link
      });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
    this.props.clearData();
  }

  componentDidMount() {
    this.props.getItemById(this.props.match.params.id);
  }

  render() {
    const { errors } = this.state;
    const { item, success } = this.props.item;

    if (item !== null) {
      const { tvid, tvname, showtype, link, place, remarks } = this.state;
      return (
        <div className="container">
          <div className="container mt-2">
            <h1
              className="text-center"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,.5)", color: "white" }}
            >
              Update Records
            </h1>
          </div>
          <div className="jumbotron bg-dark mt-4 pt-3 pb-1">
            <form onSubmit={this.onSubmit}>
              <div className="row form-group">
                <div className="col-md-2">
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.tvid
                    })}
                    placeholder="TVID"
                    name="tvid"
                    value={tvid}
                    disabled
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
                    className="form-control"
                    placeholder="Remarks"
                    name="remarks"
                    value={remarks}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-12">
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
                <div className="col-md-4" />
                <div className="col-md-4">
                  <input
                    type="submit"
                    value="Update Records"
                    className="btn btn-success btn-block"
                  />
                </div>
                <div className="col-md-4" />
              </div>
            </form>
          </div>
          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
          {errors.noitem && (
            <div className="alert alert-danger text-center" role="alert">
              {errors.noitem}
            </div>
          )}
        </div>
      );
    }
  }
}

EditForm.propTypes = {
  getItemById: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
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
  { getItemById, clearData, clearErrors, updateItem }
)(withRouter(EditForm));
