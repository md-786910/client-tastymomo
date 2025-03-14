import React from 'react'

function Buttonx({ onClick, title = "Order Now", className, width = "100%", ...otherProps }) {
    return (
        <button
            className={`order-button ${className}`}
            onClick={(props) => onClick(props)}
            width={width}
            {...otherProps}
        >
            {
                title
            }
        </button>
    )
}

export default Buttonx
