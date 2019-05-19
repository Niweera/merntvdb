import React, { Component } from 'react'

class Fearless extends Component {
  render() {
    return (
        <div className="jumbotron mt-2 pt-4 pb-4 mb-2" style={navbarStyle}>
            <p className="font-weight-bold text-center h2">
                "I must not fear. Fear is the mind-killer. Fear is the little-death that
                brings total obliteration.
                I will face my fear. I will permit it to pass over me and through me.
                And when it has gone past I will turn the inner eye to see its path.
                Where the fear has gone there will be nothing. Only I will remain."
            </p>
        </div>
    )
  }
}

const navbarStyle = {
    backgroundColor: '#3b3a30',
    textShadow: '0 1px 3px rgba(0,0,0,.5)',
    color: 'white'
}

export default Fearless;