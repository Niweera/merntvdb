import React from 'react'

export default function Help() {
  return (
    <div>
        <div className="container mt-3">
            <h1 className="text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,.5)',color: 'white'}}>Need Help? Here for You!</h1>
        </div>
        <div className="jumbotron mt-3 pt-5 pb-5" style={{backgroundColor: '#3b3a30', textShadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white'}}>
            <p className="font-weight-bold text-left h2">
                Need to know a particular TV Series is on the Niweera TVDB? Go ahead and search for it using a keyword. For example: to search for Arrow, type "Arrow" or "arrow" (without quotes) on the search box. If you want to see all the available TV Series in the Niweera TVDB, just scroll...<br/><br/>
                <span style={{fontSize: '38px'}}>Legend</span><br/>
                l = in Laptop | p = in PC<br/>
                b1, b2, b3, b4, b5 = in DVDs (in indexed Boxes)<br/>
                Airing = Telecasting right now<br/>
                Break = On a break, will return in next year<br/>
                Completed = Show is either completed or cancelled<br/>
                Remarks are there to identify the stored places of the shows 
            </p>
        </div>
    </div>
  )
}
