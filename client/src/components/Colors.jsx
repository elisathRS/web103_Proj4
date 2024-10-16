import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

const Colors = () => {
    const colors = [
    {
      color:'Black',
      value:'#FF0000'
    },
    {
        color:'Blue',
        value:'#FF0000'
    },
    {
        color:'Green',
        value:'#FFFF00'
    },
    {
      color:'Purple',
      value:'#FF0012'
    },
    {
    color:'Red',
    value:'#FF0000'
    },
    ]

    const updatePrice = (state) => {
        const basePrice = 25000; // Set your base price
        const { Color, Roof, Wheels, Interior } = state.car;
        // Calculate the price based on selected options
        let totalPrice = basePrice;
        // Add or subtract price based on options (adjust the logic as needed)
        if (Color === "Red") {
          totalPrice += 1000; // Example: Add $1000 for Red color
        }
        if (Roof === "Panoramic") {
          totalPrice += 2000; // Example: Add $2000 for Panoramic roof
        }
        if (Wheels === "Alloy") {
          totalPrice += 500; // Example: Add $500 for Alloy wheels
        }
        if (Interior === "Leather") {
          totalPrice += 1500; // Example: Add $1500 for Leather interior
        }
        state.car.Price = totalPrice; // Update the Price property in the store
      }
    const updateCarColor = useStoreActions(actions => actions.updateColor);
    const car = useStoreState((state) => state.car);
    console.log(car)
  return (
    <div className="options-container">
            <div className="options-grid">
            {colors.map((color) => {
                return (
                    <div onClick={() => updateCarColor(color.color)} className="option-item" style={{backgroundColor: color.color}} key={color.value}>{color.color}</div>
                )
            })}
            </div>
    </div>
  )
}

export default Colors