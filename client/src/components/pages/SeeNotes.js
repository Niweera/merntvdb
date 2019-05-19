import React from 'react'

export default function SeeNotes() {
  return (
    <div className="container mt-5">
        <div className="container">
            <h1 className="text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,.5)',color: 'white'}}>Notes on TVSeries</h1>
        </div>
        <div className="jumbotron mt-5" style={{backgroundColor: '#3b3a30', textShadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white'}}>
            <p className="font-weight-bold text-justify h3" style={{lineHeight: 1.4}}>
                1. The Beauty and the Beast - (S01+S02) + Game of Thrones - (S04 E01-E08) in one Pack in B2.
                <br/> 
                2. The Big Bang Theory - (S01-S09) + The Beauty and the Beast (S03+S04) in one Pack in B1.
                <br/>
                3. Game of Thrones - (S01+S02+S03+S04 E09-E10 + S05) + Personal Taste S01 in one Pack in B2.
                <br/>
                4. The Transporter + The Returned + Helix (S02) + The Shannara Chronicles in one Pack in B3.
                <br/>
                5. Lucifer S01 /w The Originals in B3.
                <br/>
                6. Lucifer S03 + Hard Sun S01 + Lethal Weapon S01-S02 + You Me Her S01-S03 + Krypton S01 in B5.
                <br/>
                7. Lost in Space S01E01-E09 /w Two and a Half Men.
                <br/>
                8. Lost in Space S01E10 /w Melissa and Joey.
            </p>
        </div>
    </div>
  )
}