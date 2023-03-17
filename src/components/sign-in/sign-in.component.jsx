import React,{useState} from "react";
import './sign-in.styles.css'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle } from "../../firebase/firebase.utils";

const  SignIn= ()=> {
    const [userCredentials,setUserCredentials]= useState({
        email:'',
        password:''
    })

    const { email, password } = userCredentials;

        const handleSubmit= async event => {
            event.preventDefault();
            try{
                await auth.signInWithEmailAndPassword(email,password);
                setUserCredentials({email: '' , password: ''})
            } catch(error){
                alert(error);
            }
        }

        const handleChange= event =>{
            const {name,value}= event.target;
            setUserCredentials({...userCredentials,[name]: value})
        }
    
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your Email and Password</span>
                <form onSubmit={handleSubmit}>
                <FormInput  handleChange={handleChange} type="email" name="email" label='email' value={email} required/>
                <FormInput handleChange={handleChange} type="password" name="password" label='password' value={password} required/>
                <div className="buttons">
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>{' '}Sign In With Google{' '}</CustomButton>
                </div>
                </form>
            </div>
        )
}

export default SignIn;