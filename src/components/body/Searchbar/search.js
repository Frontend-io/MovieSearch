import React, {Component} from 'react';
import "./search.css";

class SearchBar extends Component{
    render(){
        return(
            <div className="padded-15 search white mat shadow grid apart">
                <div className="text">
                    <h3>We currently have {this.props.movieCount} {(this.props.movieCount > 1)? 'movies': "movie"} in our series</h3>
                    <span className="grey-t">All movies are rated +13</span>
                </div>
                <input disabled={ this.props.checkNetwork} value={this.props.value} type="text" placeholder="Search for a movie" onChange={this.props.action} />
            </div>
        )
    }
}

export default SearchBar;