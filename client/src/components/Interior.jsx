import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';

const Interior = () => {
    const Interior = [
    {
        name:'Black',
        value:'https://th.bing.com/th/id/OIP.Bi1q16OxZJYtfs76vrnWdwHaD3?w=302&h=180&c=7&r=0&o=5&pid=1.7'
    },
    {
        name:'Mocha',
        value:'https://th.bing.com/th/id/OIP.dRNroOtp6NrOgdn82qXLVwAAAA?rs=1&pid=ImgDetMain'
    },
    
    {
        name:"Purple",
        value:"https://i.pinimg.com/736x/24/e1/df/24e1df37aba51e0bfac6c65c9689c1e3--custom-car-interior-pinky-swear.jpg"
    },
    {
        name:'Red',
        value:'https://cdn.bmwblog.com/wp-content/uploads/2017/08/20525682_1384105078293185_1831626250395717854_n.jpg'
    },
    {
        name:'White',
        value:'https://th.bing.com/th/id/OIP.gW5azY9lOO0BlHntezURGAHaE2?w=261&h=180&c=7&r=0&o=5&pid=1.7'
    },
]

    const updateCarInterior = useStoreActions(actions => actions.updateInterior);
    const updateCarPrice = useStoreActions(actions => actions.updatePrice )
    const handleClick = (color) => {
        updateCarInterior(color.name)
        if(color.name == 'Red' || color.name == 'Purple' ){
            updateCarPrice(3500)
        } else {
            updateCarPrice(-3500)
        }
    };
    
    
  return (
    <div className="options-container" >
            <div className="options-grid">
            {Interior.map((color) => {
                return (
                    <div  onClick = {() => handleClick(color)} className="option-item"style={{background: `url(${color.value}) center`,backgroundSize: "cover" }} key={color.name}>{color.name}</div>
                )
            })}
            </div>
    </div>
  )
}

export default Interior