import React, {useState,useEffect} from 'react'

function ColorPicker( {colors=[], activeColor, setActiveColor}) {
    if (!colors.length) return null
    return (
        <fieldset className="color-picker">
            {colors.map((color, i) => (
                <label key={i}>
                    <input 
                    type="radio" 
                    name="color" 
                    value={color}
                    checked={activeColor === color}
                    onChange={() => setActiveColor(color)}
                    />
                    <span style={{background: color}}></span>
                </label>
            ))}
        </fieldset>
    )
}

export default ColorPicker
