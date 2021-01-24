import React, { useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
    const [newTweet, setNewTweet] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        dbService.collection("tweets").add({
            newTweet,
            createdAt: Date.now(),
        })
    };
    const onChange = (e) => {
       const { 
            target:{value}
       } = e;
       setNewTweet(value);
    };

    return (
       <div>
           <div className="newTweet_wrap">
               <form onSubmit={onSubmit}>
                   <input 
                   value={newTweet} 
                   onChange={onChange}
                   type="text" 
                   placeholder="What's on your mind?" 
                   maxLength={120} />
                   <input 
                   type="submit" 
                   value="Go Tweet" />
               </form>
           </div>
       </div>
    );
};

export default Home;