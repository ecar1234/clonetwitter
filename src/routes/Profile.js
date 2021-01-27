import { authService } from 'fbase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'routes/Profile.css'

const Profile = ({ refreshUser, userObj }) => {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
           await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }; 

    return (
       <div className="profile_container">
            <form className="profile_form" onSubmit={onSubmit}>
                <input
                    className="profile_input" 
                    onChange={onChange} 
                    type="text" 
                    placeholder="User Name" 
                    value={newDisplayName}
                    size="20"
                    maxLength={16}
                />
                <input 
                    className="profile_submit"
                    type="submit" 
                    value="Update" 
                />
            </form>
            <div className="profile_logout">
                <button className="logout" onClick={onLogOutClick}>Log out</button>
            </div>
       </div>
    );
};

export default Profile;