import React,{useState} from "react";
import './sign-up.styles.css'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth,createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp= ()=> {
    
    const [userCredentials,setUserCredentials]=useState({
        displayName:'',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword }= userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserProfileDocument(user, { displayName });
    
          setUserCredentials({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleChange = event => {
        const { name, value } = event.target;
    
        setUserCredentials({...userCredentials ,[name]: value });
      };
     
        return (
            <div className="sign-up">
                <h2 className="title"> I do not have an account</h2>
                 <span>Sign Up with your Email and Password</span>
                 <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
            </div>
        )
}

export default SignUp;