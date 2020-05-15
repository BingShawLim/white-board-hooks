import React from 'react'

export default React.memo(
    ({cb}) => {
        return <button className="button-save" onClick={cb} >Save Image</button>
    }
)