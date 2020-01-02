import React, {Component} from 'react';
import "./Series.css";
import SeriesList from '../../components/SeriesList/seriesList';
import Intro from '../../components/Intro/Intro';
import SearchBar from '../../components/body/Searchbar/search';
import 'whatwg-fetch';
import Loader from '../../components/body/Loader/loader';


class Series extends Component{
    state = {
        series: [],
        isLoading: false,
        seriesName: '',
        onLine: false,
    }
    checkNetwork(){
        window.addEventListener('load', ()=>(
            navigator.onLine ? this.setState({onLine: true}): this.setState({onLine: false})
        ))
    }
    componentDidMount(){
        this.checkNetwork();
    }
    // reload(){
    //     location.reload()
    // }
    handleOnchangeEvent= (e)=>{ 
        if(this.state.onLine){
            const query = e.target.value; 
            this.setState({isLoading:true, seriesName: query})
            setTimeout(() => {
                fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
                .then(response => response.json())
                .then(json => this.setState({series:json, isLoading:false})
                )
            }, 500);
        }else{
            setTimeout(() => {
                alert('Network connection not available, please check your network connection')
            }, 1000);
        }
    }

    render(){
        const {series, isLoading, seriesName, onLine} = this.state;
        return(
            <div>
                <SearchBar  action={this.handleOnchangeEvent} movieCount={series.length} />
                {
                    isLoading && seriesName !== '' && onLine &&
                    <Loader message="Searching..."/>
                }
                {/* If the search box is empty */}
                {
                    seriesName === '' && onLine &&
                    <Intro className='notice' message="Please enter a movie name to search" />
                }
                {/* If no match was found */}
                {
                    seriesName !== '' && series.length === 0 && !isLoading && onLine &&
                    <Intro className='notice' message="No results were found, please try again" />
                }
                {
                    series !== null && onLine &&
                    <SeriesList list={series} />
                }
                {
                    !onLine &&
                    <div>
                        <button onClick={this.reload}> Refresh</button>
                        <Intro className='notice' message="You are currently offline, please check your network connect and retry"/>
                    </div>
                }
            </div>
        )
    }
}

export default Series;