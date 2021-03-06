import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Tweets from 'components/Tweets';
import TweetFactory from 'components/TweetFactory';
import 'routes/Home.css'


const Home = ({ userObj }) => {

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

    

    return (
       <div className="home_container">
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map(tweet => (
                    <Tweets 
                    key={tweet.id} 
                    userObj={userObj}
                    tweetObj={tweet} 
                    isOwner={tweet.userId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;