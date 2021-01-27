import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase'
import 'components/App.css'

function App() {
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName || "Guest",
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      }
      else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <>
   { init ? 
   <AppRouter 
   refreshUser={refreshUser} 
   isLoggedIn={isLoggedIn} 
   userObj={userObj} 
   /> : (
     "initializing..."
     )}
   </>
  );
}

export default App;