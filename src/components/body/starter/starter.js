import React from 'react';
import "./starter.css"

const Starter = props=>{
    return(
        <button  onClick={props.loadApp} className="primary-btn starter-btn">{props.message}</button>
    )
}

export default Starter;