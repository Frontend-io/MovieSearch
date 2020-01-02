import React from "react";
import './loader.css';

const Loader = props=>{
    return(
        <div className="absolute loader">
            <h1>{props.message}</h1>
        </div>
    )
}
export default Loader;