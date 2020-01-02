import React, {Component} from 'react';
import './SingleSeries.css';
import 'whatwg-fetch';
import Intro from '../../components/Intro/Intro';
import SeriesList from '../../components/SeriesList/seriesList';
import Loader from '../../components/body/Loader/loader';

class SingleSeries extends Component{
    state = {
        series: [],
        relatedSeries: [],
        isRelatedLoaded: false,
        exactId: this.props.match.params.id,
        isSeriesLoaded: true
    }
    
    componentDidMount(){
        const id = this.state.exactId;
        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then(response => response.json())
        .then(json => this.setState({series:json}))  

        // Fetch series into the related movies array shortly after
        setTimeout(() => {
            const relatedQuery = this.state.series.name.split(' ')[0];
            fetch(`http://api.tvmaze.com/search/shows?q=${relatedQuery}`)
            .then(response => response.json())
            .then(json => this.setState({relatedSeries:json, isRelatedLoaded: true}))  
        }, 1000);
    }
    render(){
        const {series, relatedSeries, isRelatedLoaded, isSeriesLoaded} = this.state;
        return(
            <div className="singleSeries ">
                {
                    !isSeriesLoaded &&
                    <Loader message="Loading series..."/>
                }
                {
                    isSeriesLoaded &&
                        <div className="container">
                    <div className="no-wrap grid top-bar">
                    <button className="margin-20 " onClick={this.props.history.goBack}>Go back</button>
                        <Intro className="padded-20 bordered margin-20 blue intro" message={ `You are currently viewing the series ${this.props.match.params.id} `}/>
                    </div>
                    <div className="padded-10 mat shadow grid centered seriesProper">
                        {
                            series.image &&
                            <img src={series.image.medium} alt={series.id}/>
                        }
                        <div className="col grid des">
                            <h1>{series.name} - {series.language}</h1>
                            <div className='divider'></div>
                            <span>Release date- {series.premiered}</span>
                            <p>Genre - {series.genres + ' '}</p>
                            <span>Official website - {series.officialSite}</span>
                            <span>Runtime- {series.runtime} [minutes]</span>
                            <span>Average Rating - {
                                series.rating &&
                                series.rating.average
                            }</span>
                            <p>
                                {
                                    series.summary &&
                                    series.summary.split('<p>')[1].split('</p>')[0]
                                }
                            </p>
                            <span>
                                {
                                    series.schedule &&
                                    `Shows at ${series.schedule.time} every ${series.schedule.days + ' '} `
                                }
                            </span>
                        </div>
                    </div>
                   <div className="no-wrap grid " >
                    <h3 className="padded-10 ">Related Series - by </h3>
                    <select className="blue margin-10 padded-10 ">
                        <option defaultValue>Title</option>
                        <option >Genre</option>
                        <option >Runtime</option>
                    </select>
                   </div>
                    {
                        isRelatedLoaded &&
                        <SeriesList list={relatedSeries}/>
                    }
                </div>
                }
            </div>
        )
    }
}

export default SingleSeries;