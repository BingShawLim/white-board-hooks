import React, {useState,useEffect}from 'react'
import randomColor from 'randomcolor'

import Name from './Name'
import ColorPicker from './ColorPicker'

function Paint() {
    const [colors, setColors] = useState([])
    const [activeColor, setActiveColor] = useState(null)

    const randomMode = () => {
        const colorModes = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
        const doRandom = Math.floor(Math.random * colorModes.length)
        return colorModes[doRandom]
    }
    const getColors = () => {
        const baseColor = randomColor().slice(1);
        const useMode = randomMode()
        fetch('`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${randomMode}`')
        .then(response => response.json())
        .then(data => {
            setColors(data.colors.map(color = color.hex.value))
            setActiveColor(data.colors[0].hex.value)
        })

    }

    return (
        <div>
            
        </div>
    )
}

export default Paint
