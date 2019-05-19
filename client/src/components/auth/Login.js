import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { notifyUser } from '../../actions/notifyActions';
// import Alert from '../layout/Alert';

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

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
    console.log(user);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // const { message, messageType } = this.props.notify;
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* {message && messageType === 'error' ? ( */}
            {/* <Alert message={message} messageType={messageType} /> */}
            {/* ) : null} */}
            <div className="card" style={{ backgroundColor: '#3b3a30', textSshadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white' }}>
              <div className="card-header text-center" style={{ backgroundColor: '#212529', textShadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white' }}><i className="fas fa-lock"></i> Login</div>

              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                    <div className="col-md-6">
                      <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChange} required autoFocus />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                    <div className="col-md-6">
                      <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} required />
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

export default Login;
