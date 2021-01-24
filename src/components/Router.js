import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Nav from 'components/Nav'
import Profile from 'routes/Profile';



const AppRouter = ({ isLoggedIn }) => {
   
    return (
        <>
        {isLoggedIn && <Nav />}
        <Switch>
            {isLoggedIn ? 
            <>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </> : 
            <>
                <Route exact path="/">
                    <Auth />
                </Route>
            </> }
        </Switch>
        </>
    )
};

export default AppRouter;