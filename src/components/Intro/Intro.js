import React from 'react';
import './Intro.css';

const Intro = props=>{
    return(
        <p className={props.className}>{props.message}</p>
    )
}
export default Intro;