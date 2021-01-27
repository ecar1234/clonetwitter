import { dbService, storeService } from 'fbase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import 'components/Tweets.css'



const Tweets = ({ userObj, tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] =useState(tweetObj.text);

    const onEdit = () => {
        setEditing(prev => !prev);
    };
    const onUpdate = async (e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: editTweet
        });
        setEditing(false);
    };
    const onDelete = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storeService.refFromURL(tweetObj.attachmentUrl).delete(); // refURL 에서 ref로 수정.. 이유 모름..
        }
    };
    const onChange = (e) => {
        setEditTweet(e.target.value); 
    };

    
    return (
       <div  className="tweet_container">
           { editing ? (
               <form  className="tweet_editForm">
                    <p>{userObj.displayName}</p>
                   <input 
                    onChange={onChange} 
                    type="text" 
                    value={editTweet} 
                    required 
                   />
                   <input 
                    className="tweet_formBtn"
                    onClick={onUpdate} 
                    type="submit" 
                    value="Update" 
                   />
                   <span onClick={onEdit} className="formBtn cancelBtn">
                        Cancel
                   </span>
                   {tweetObj.attachmentUrl && 
                   <img src={tweetObj.attachmentUrl} alt="" />}
                    <p>{tweetObj.createdAt}</p>
               </form>
           ) : (
            <>
                {tweetObj.curId ? 
                    <p className="tweet_user">{tweetObj.curId}</p> :
                    "Guest"
                 }
                <p className="tweet_text">{tweetObj.text}</p>
                {tweetObj.attachmentUrl && 
                <img src={tweetObj.attachmentUrl} alt="" />}
                <p className="tweet_time">{tweetObj.createdAt}</p>

                <div className={isOwner ? "tweet_action" : "tweet_action_none"}>
                    <span onClick={onEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                    <span onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </div>
                
            </>
           )}
       </div>
    );
};

export default Tweets;