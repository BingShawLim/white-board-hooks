import React, { useState, useEffect, useRef } from 'react'

function Canvas {
    const [drawing, setDrawing] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const canvasRef = useRef(null)

    useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d')
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    },[])
    return (
        <div>
            
        </div>
    )
}

export default Canvas
