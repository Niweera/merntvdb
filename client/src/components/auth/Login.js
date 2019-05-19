import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    const userData = {
      email,
      password
    };

    this.props.loginUser(userData);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors } = this.state;
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{ backgroundColor: '#3b3a30', textSshadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white' }}>
              <div className="card-header text-center" style={{ backgroundColor: '#212529', textShadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white' }}><i className="fas fa-lock"></i> Login</div>

              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                    <div className="col-md-6">
                      <input type="email" className={classnames('form-control', { 'is-invalid': errors.email })} name="email" value={this.state.email} onChange={this.onChange} required autoFocus />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                    <div className="col-md-6">
                      <input type="password" className={classnames('form-control', { 'is-invalid': errors.password })} name="password" value={this.state.password} onChange={this.onChange} required />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-dark btn-block">
                        Login
                          </button>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
