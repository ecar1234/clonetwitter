import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Nav from 'components/Nav'
import Profile from 'routes/Profile';



const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
   
    return (
        <>
        {isLoggedIn && <Nav userObj={userObj} />}
        <Switch>
            {isLoggedIn ? 
            <>
                <Route exact path="/clonetwitter">
                    <Home userObj={userObj} />
                </Route>
                <Route path="/profile">
                    <Profile refreshUser={refreshUser} userObj={userObj} />
                </Route>
            </> : 
            <>
                <Route exact path="/clonetwitter">
                    <Auth />
                </Route>
            </> }
        </Switch>
        </>
    )
};

export default AppRouter;