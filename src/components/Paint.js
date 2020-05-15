import React, {useState,useEffect, useRef, useCallback}from 'react'
import randomColor from 'randomcolor'

import Name from './Name'
import ColorPicker from './ColorPicker'
import useWindowSize from './WindowSize'
import Canvas from './Canvas'
import Refresher from './Refresher'
import SaveDraw from './SaveDraw'

function Paint() {
    const [colors, setColors] = useState([])
    const [activeColor, setActiveColor] = useState(null)

    const getColors = useCallback( () => {
        const randomMode = () => { return ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement', 'triad', 'quad'][Math.floor(Math.random() * 8)]}
        const baseColor = randomColor().slice(1)
        const useMode = randomMode()
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${useMode}`)
        .then(response => response.json())
        .then(data => {
            setColors(data.colors.map(color => color.hex.value))
            setActiveColor(data.colors[0].hex.value)
        })
    }, [])    

    const saveImg = useCallback(
        () => {
            const canvas = document.getElementById('canvas')
            const dataURI = canvas.toDataURL('image/jpeg')
            const name = document.getElementById('name').value
            console.log(dataURI, `${name || "untitled"}.jpeg`);
        },
        [])

    useEffect(getColors, [])
    const headerRef = useRef({offsetHeight: 0})

    const [visible, setVisible] = useState(false)
    let timeoutId = useRef()
    const [windowWidth, windowHeight] = useWindowSize(() => {
        setVisible(true)
            clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(() => {setVisible(false)}, 700)
    })

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
                    <SaveDraw 
                    cb={saveImg}
                    />
                </div>
            </header>
            {activeColor &&(
                <div style={{background: "black"}} >
                <Canvas 
                    color={activeColor}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                />
                </div>
            )}
            <div className={`window-size ${visible? '' : 'hidden'}`}>
                {windowWidth} x {windowHeight}
            </div>
        </div>
    )
}

export default Paint
