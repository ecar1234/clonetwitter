import React, { useState } from 'react';
import { storeService, dbService } from 'fbase'
import { v4 as uuidV4 } from 'uuid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import 'components/TweetFactory.css'

const TweetFactory = ({ userObj }) => {

    const [newTweet, setNewTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const [curId, setCurId] = useState("")
    const empty = document.querySelector(".empty_error")
   
    const onSubmit = async(e) => {
        if(newTweet === "") {
            return empty.style.visibility="visible"
        }
        else{
            e.preventDefault();
            empty.style.visibility="hidden"
            let attachmentUrl = "";
            setCurId(userObj.displayName);
            let day = (new Date()).toISOString().substr(0, 10);
            let h = (new Date()).getHours();
            let m = (new Date()).getMinutes();
            let s = (new Date()).getSeconds();
            
            if(attachment !== ""){
                const attachmentRef = storeService.ref().child(`${userObj.uid}/${uuidV4()}`);
                const response = await attachmentRef.putString(attachment, "data_url");
                attachmentUrl = await response.ref.getDownloadURL();
            }
           
            const tweet = {
                text: newTweet,
                createdAt: `${day} ${h}:${m}:${s}`,
                userId: userObj.uid,
                curId: curId || "Guest" ,
                attachmentUrl
            };
            await dbService.collection("tweets").add(tweet);
            setNewTweet("");
            setAttachment("")
        }
    }; 

    const onChange = (e) => {
       const { 
            target:{value}
       } = e;
       setNewTweet(value);
    };

    const onFileChange = (e) => {
        const theFile = e.target.files[0];
        const reader = new FileReader();
        if(theFile && theFile.type.match("image.*")){
            reader.readAsDataURL(theFile);
        }
        reader.onloadend = (e) => {
            setAttachment(e.currentTarget.result);
        }
        
    }
    const clearImg = () => setAttachment("");

    return (
        <div className="main_container">
            <form className="factory_form" onSubmit={onSubmit}>
               <div className="factory_input_container">
                <input 
                    className="factory_input"
                    value={newTweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} />
                <input 
                    className="factory_submit"
                    type="submit" 
                    value="Go Tweet" />
               </div>
            </form>
            <div className="empty_error">Please enter your twwet!!</div>
            <label className="factoryInput_label" htmlFor="attach_file" >
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input	      
                className="factoryForm_file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />	      
            {attachment && (
                <div className="factoryForm_attachment" >
                    <img src={attachment} alt="" 
                    style={{
                    backgroundImage: attachment,
                    }} />
                    <div className="factoryForm_clear" onClick={clearImg}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default TweetFactory;