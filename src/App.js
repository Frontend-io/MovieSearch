import React, { Component } from 'react';
import './App.css';
import Intro from './components/Intro/Intro';
import Starter from './components/body/starter/starter';
import RouterMain from './Router/router';



class App extends Component{
  state = {
    begun: false,
    message: 'Get started',
  };

  constructor(props){
    super(props);
    this.loadApp = this.loadApp.bind(this); 
  }

  loadApp(){
    if (this.state.begun === false) {
      this.setState({begun: true});
      this.setState({message: "Close App"})
    } else {
      this.setState({begun: false});
      this.setState({message: "Get started"})
    }
  }

  render(){
    const {begun} = this.state;
    return (
      <div className="App">
        <header className={this.state.begun ? 'swipe App-header' : 'App-header'}>
           <div className='des'>
             <h1>Tv Movies search </h1>
              <Intro message="Welcome to Movies series, you can search for movies and get reviews"/>
            </div>
           <Starter loadApp={this.loadApp} message={this.state.message}/>
        </header>
        {
          begun &&
          <div>
            <RouterMain />
          </div>
        }
      </div>
    );
  }
}

export default App;
