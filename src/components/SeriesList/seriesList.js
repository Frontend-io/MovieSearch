import React, { Component } from 'react';
import "./seriesList.css";
import Intro from '../Intro/Intro';
import {Link} from 'react-router-dom';

const SeriesListItem = ({series})=>(
    <Link to={'/series/' + series.show.id} >
        <div key={series.show.id} className='mat shadow white relative movie'>
            <label className="absolute right-0 label">
               {
                   series.show.language &&
                   series.show.language
               }
               {
                   !series.show.language &&
                   'Unspecified'
               }
            </label>
            {/* If series cover exists */}
            <div className="img"></div>
            {/* {
                series.show.image &&
                <div className="img">
                    <img src={series.show.image.medium} alt={series.show.image.medium} />
                </div>
            } */}
            {/* else */}
            {/* {
                series.show.image === null &&
                <div className="img">
                    <img src="https://imgplaceholder.com/420x320/cccccc/757575/glyphicon-film" alt={series.show.name} />
                </div>
            } */}
            <div className=" des">
                <h4 className="title">Title- {series.show.name}</h4>
                {
                    series.show.genres.length > 0 &&
                    <div>
                        <div className="divider"></div>
                        <p>Genre(s) - {series.show.genres + ''} </p>
                    </div>
                }   
                {
                    series.show.genres.length === 0 &&
                    <div>
                        <div className="divider"></div>
                        <p>Genre(s) - Unspecified</p>
                    </div>
                }              
                {
                    series.show.schedule.day !== null && series.show.schedule.time !== '' 
                    &&
                    <div>
                        <div className="divider"></div>
                        <p>{series.show.schedule.days + ''} at {series.show.schedule.time}</p>
                    </div>
                }
            </div>
        </div>
    </Link>
)

const SeriesList = (props)=>{
    return(
        <div className="seriesList">
            <Intro message={props.message}/>
            <div className="grid movie-wrap padded-20">
                {props.list.map(series=>(
                    <SeriesListItem series={series}/>
                ))}
            </div>
        </div>
    )
    }

export default SeriesList;