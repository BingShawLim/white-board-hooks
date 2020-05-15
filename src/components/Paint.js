import React, {useState,useEffect, useRef, useCallback, useMemo}from 'react'
import randomColor from 'randomcolor'

import Name from './Name'
import ColorPicker from './ColorPicker'
import WindowSize from './WindowSize'
import Canvas from './Canvas'
import Refresher from './Refresher'


function Paint() {
    const [colors, setColors] = useState([])
    const [activeColor, setActiveColor] = useState(null)

    const getColors =useCallback( () => {
        const randomMode = () => {
            const colorModes = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad']
            const doRandom = Math.floor(Math.random() * colorModes.length)
            return colorModes[doRandom]
        }

        const baseColor = randomColor().slice(1);
        const useMode = randomMode()

        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${useMode}`)
        .then(response => response.json())
        .then(data => {
            setColors(data.colors.map(color => color.hex.value))
            setActiveColor(data.colors[0].hex.value)
        })
    }, [])

    useEffect(getColors, [])
    const headerRef = useRef({offsetHeight: 0})

    return (
        <div className="app">
            <header ref={headerRef} style={{borderTop: `10px solid ${activeColor}`}}>
                <div className='app'>
                    <Name />
                </div>
                <div style={{marginTop: 10}}>
                    <ColorPicker
                        colors={colors}
                        activeColor={activeColor}
                        setActiveColor={setActiveColor}
                    />
                    <Refresher cb={getColors}/>
                </div>
            </header>
            {activeColor &&(
                <Canvas 
                    color={activeColor}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                />
            )}
            <WindowSize />
        </div>
    )
}

export default Paint
