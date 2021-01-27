import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm'
import 'routes/Auth.css'

const Auth = () => {
    const onSocialClick = async (e) => {
        let provider;
        const {
            target: { name }
        } = e;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }
    return (
        <div className="auth_container">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="4x"
                style={{ marginBottom: 30 }}
            />
           <AuthForm />
            <div className="auth_buttons">
                <button 
                    className="auth_button" 
                    onClick={onSocialClick} 
                    name="google">
                    Continue with Google
                    <FontAwesomeIcon icon={faGoogle} />
                 </button>
                <button 
                    className="auth_button" 
                    onClick={onSocialClick} 
                    name="github">
                    Continue with Github
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
           
        </div>
    );
};

export default Auth;