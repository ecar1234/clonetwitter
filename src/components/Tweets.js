import { dbService } from 'fbase';
import React, { useState } from 'react';

const Tweets = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] =useState(tweetObj.text);

    const onEdit = () => {
        setEditing(prev => !prev);
    }
    const onUpdate = async (e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: editTweet
        });
        setEditing(false);
    }
    const onDelete = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    }
    const onChange = (e) => {
        setEditTweet(e.target.value); 
    }

    return (
       <div>
           { editing ? (
               <form>
                   <input onChange={onChange} type="text" value={editTweet} required />
                   <input onClick={onUpdate} type="submit" value="Update" />
                   <button onClick={onEdit}>Cancel</button>
               </form>
           ) : (
            <div>
            <h4>{tweetObj.text}</h4>
            <h6>{tweetObj.createdAt}</h6>
            {isOwner && (
              <>
                <button onClick={onEdit}>Edit Tweet</button>
                <button onClick={onDelete} >Delete Tweet</button>
              </>
            )}
            </div>
           )}
       </div>
    );
};

export default Tweets;