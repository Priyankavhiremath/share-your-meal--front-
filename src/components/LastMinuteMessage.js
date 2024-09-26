import React from 'react'




const LastMinuteMessage = () => {
    return (
            <div style={{display: "flex"}}>
            
            <h1 className="lastMinute" style={{
            position:"absolute",
            top: "10vh",
            right: 150,
            opacity: "0.4",
            fontSize: "10rem",
            color: "blanchedalmond",
            zIndex:1,
            }}>last minute...</h1>
        </div>
    )
}

export default LastMinuteMessage
