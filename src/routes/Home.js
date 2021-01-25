import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Tweets from 'components/Tweets'


const Home = ({ userObj }) => {
    const [newTweet, setNewTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    // 데이터를 받아오는 방법(1) : get으로 받아온 데이터를 forEach 로 분할
    // const getTweets = async() => {
    //     const dbTweets = await dbService.collection("tweets").get();
        
    //     dbTweets.forEach(document => {
    //         const tweetsObj = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setTweets(prev => [tweetsObj, ...prev]);
    //     })
    // }
    useEffect(() => {
        // getTweets();

        dbService.collection("tweets").onSnapshot(snaps => { //(2) snapshot 을 통해서 실기간 반영 하는 방법
            const tweetArr = snaps.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTweets(tweetArr);
        });

    },[]);

    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: newTweet,
            createdAt: Date.now(),
            userId: userObj.uid
        });
        setNewTweet("");
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
                   <input value={newTweet} 
                   onChange={onChange} 
                   type="text" 
                   placeholder="What's on your mind?" 
                   maxLength={120} />
                   <input 
                   type="submit" 
                   value="Go Tweet" />
               </form>
               <div>
                   {tweets.map(tweet => (
                       <Tweets 
                       key={tweet.id} 
                       tweetObj={tweet} 
                       isOwner={tweet.userId === userObj.uid}
                        />
                   ))}
               </div>
           </div>
       </div>
    );
};

export default Home;