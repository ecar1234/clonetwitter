import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Nav from 'components/Nav'
import Profile from 'routes/Profile';



const AppRouter = ({ isLoggedIn, userObj }) => {
   
    return (
        <>
        {isLoggedIn && <Nav />}
        <Switch>
            {isLoggedIn ? 
            <>
                <Route exact path="/">
                    <Home userObj={userObj} />
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