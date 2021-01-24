import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'



const AppRouter = ({ isLoggedIn }) => {
   
    return (
        <Switch>
            {isLoggedIn ? 
            <>
            <Route exact path="/">
                <Home />
            </Route>
            </> : 
            <>
            <Route exact path="/">
                <Auth />
            </Route>
            </> }
        </Switch>
    )
};

export default AppRouter;