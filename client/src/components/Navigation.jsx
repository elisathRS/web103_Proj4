import React from 'react'
import '../App.css'
import '../css/Navigation.css'

import { useStoreActions } from 'easy-peasy';

const Navigation = () => {

    const reset = useStoreActions ((state) => state.resetCar)
    return (
        <nav>
            <ul>
                <li><h2> BOLT BULKET </h2></li>
            </ul>
            <ul>
                {/*<li role='button' onClick={() => reset()}>reset</li>*/}
                <li><a href='/' role='button'>Customize</a></li>
                <li><a href='/cars' role='button'>View Cars</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation