import React, { useState } from 'react';
import { authService } from 'fbase';
import 'components/AuthForm.css'

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("error");

    const onChange = (e) => {
        const {
            target: {name, value}
        } = e;
        if(name === "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            if(newAccount){
               await authService.createUserWithEmailAndPassword(email, password);
            }
            else{
                await authService.signInWithEmailAndPassword(email, password);
            }
        }
        
        catch(error){
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

    return (
        <>
            <form className="authForm_container" onSubmit={onSubmit}>
                <input 
                    className="auth_input"
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required value={email} 
                    onChange={onChange} />
                <input 
                    className="auth_input"
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    required value={password} 
                    onChange={onChange}/>
               <input className="auth_submit" 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"} 
               />
               <div 
                    className={error !=="error" ? "auth_error" : "auth_noneError"} 
               >
               {error}
               </div> 
           </form>
            <span className="auth_switch" onClick={toggleAccount}>
                {newAccount ? "Log In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;