import React from 'react'


export function CardElement(props) {
  <div onClick={() => { props.handleFlip(props.card) }} id={props.card.id} className={`card ${props.card.flipped ? "flip" : ""}`}>
    <div className="card_front">
      <img className="icon"
        src={`./images${props.card.icon}.png`}
        alt={props.card.icon}></img>
    </div>
    <div className="card_back">
      {"</>"}
    </div>
  </div>
}
