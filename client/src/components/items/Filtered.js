import React, { Component } from 'react'

class Filtered extends Component {

    filterIt = () => {
        let filterValue = document.getElementById('filterInput').value.toUpperCase();
        // Get names ul
        let ul = document.getElementById('tvNames');
        // Get lis from ul
        let li = [];
        if(ul){
            li = ul.querySelectorAll('#mainBlock');
        }
        // Loop through collection-item lis
        for(let i = 0;i < li.length;i++){
            let a = li[i].getElementsByTagName('a')[0];
            // If matched
            if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            li[i].style.display = '';
            } else {
            li[i].style.display = 'none';
            }
        }
    };
  render() {
    return (
      <div>
        <div className="container mt-2">
            <h1 className="text-center" style={fontStyle}>Search for TV Series using keywords</h1>
        </div>
        <div className="container mt-3 text-center">
            <div className="row">
                <div className="col-md-4 col-lg-4"></div>
                <div className="col-md-4 col-lg-4">
                    <input className="form-control" onKeyUp={this.filterIt} type="text" id="filterInput" placeholder="Enter TV Series Name" autoFocus/>
                </div>
                <div className="col-md-4 col-lg-4"></div>
            </div>
        </div>
      </div>
    )
  }
}

const fontStyle = {
    color: 'white',
    textShadow: '0 1px 3px rgba(0,0,0,.5)'
};

export default Filtered;