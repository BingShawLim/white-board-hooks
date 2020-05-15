import React from 'react'

export default React.memo(
    ({cb, dl}) => {
        return <button className="button-save" onClick={cb} download={dl}>Save Image</button>
    }
)