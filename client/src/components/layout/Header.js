import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
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

// const loginStyle = {
//     backgroundColor: '#3b3a30',
//     textShadow: '0 1px 3px rgba(0,0,0,.5)',
//     color: 'white',
//     cursor: 'pointer',
//     border: 'none',
//     fontSize: '20px'
// }

const headingStyle = {
    fontSize: '20px'
};

const headerStyle = {
    fontSize: '24px'
};

export default Header;