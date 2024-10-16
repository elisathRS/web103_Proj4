import React from 'react'

const Card = ({ name, color, roof, wheels, interior, price }) => {
  return (
    <article>
      <header>
        <h3>{color}</h3>
      </header>
      <div class="car-card">
        <div class="car-summary">
          <p><strong>🖌️ Exterior:</strong> {name}</p> 
          <p><strong>😎 Roof:</strong> {roof}</p>
        </div>
        <div class="car-summary">
          <p><strong>Wheels:</strong> {wheels}</p>
          <p><strong>💺 Interior:</strong> {interior}</p>
        </div>
        <div class="car-price">
          <p>💰 ${price}</p>
          <a role="button">Details</a>
        </div>
      </div>
    </article>
  )
}

export default Card