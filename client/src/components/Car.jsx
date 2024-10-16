import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

const Car = () => {
    const {name, color, roof, wheels, interior, price}  = useStoreState((state) => state.car)
  return (
    <div class="create-car-price">
        <p>{name}</p>
        <p>{color}</p>
        <p>{roof}</p>
        <p>{wheels}</p>
        <p>{interior}</p>
        <p>${price}</p>
    </div>
  )
}

export default Car