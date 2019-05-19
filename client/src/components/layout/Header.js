import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <nav className="navbar navbar-expand-md navbar-dark" style={navbarStyle}>
                <div className="container">
                    <Link style={headerStyle} className="navbar-brand" to="/">Niweera TVDB</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link style={headingStyle} className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={headingStyle} className="nav-link" to="/dmca">DMCA</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={headingStyle} className="nav-link" to="/help">Help</Link>
                            </li>
                            <li className="nav-item">
                                <a style={headingStyle} className="nav-link" rel="noopener noreferrer" target="_blank" href="https://blog.niweera.gq">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a style={headingStyle} className="nav-link" rel="noopener noreferrer" target="_blank" href="https://niweera.gq">Niweera.GQ</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {isAuthenticated ? (
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle" style={loginStyle} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Niweera
                                    </button>
                                    <div className="dropdown-menu" style={{ backgroundColor: '#3b3a30', color: 'white' }} aria-labelledby="navbarDropdown">
                                        <Link style={{ fontSize: '20px', color: 'white' }} className="dropdown-item" to="/add">Insert Records</Link>
                                        <a className="dropdown-item " style={{ fontSize: '20px', color: 'white' }} href="#!" onClick={this.onLogoutClick.bind(this)}>Logout</a>
                                    </div>
                                </li>) : (
                                    <li className="nav-item">
                                        <Link style={headingStyle} className="nav-link" to="/login">Login</Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const navbarStyle = {
    backgroundColor: '#3b3a30',
    textShadow: '0 1px 3px rgba(0,0,0,.5)',
    color: 'white'
}

const loginStyle = {
    backgroundColor: '#3b3a30',
    textShadow: '0 1px 3px rgba(0,0,0,.5)',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontSize: '20px'
}

const headingStyle = {
    fontSize: '20px'
};

const headerStyle = {
    fontSize: '24px'
};

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);