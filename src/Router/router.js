import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Series from "../containers/Series/Series";
import SingleSeries from "../containers/SingleSeries/SingleSeries";

const RouterMain = props =>(
    <Switch>
        <Route exact path="/"  component={Series}/>
        <Route path="/series/:id"  component={SingleSeries}/>
        <Redirect path='/series' to="/" />
    </Switch>
    
)
export default RouterMain