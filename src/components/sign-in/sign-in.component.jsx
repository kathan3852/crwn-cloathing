import React from "react";
import './sign-in.styles.css'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }

        this.handleSubmit= event => {
            event.preventDefault();
            this.setState({email:'' , password:''})
        }

        this.handleChange= event =>{
            const {name,value}= event.target;
            this.setState({[name]: value})
        }
    }
    
    render(){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your Email and Password</span>
                <form onSubmit={this.handleSubmit}>
                <FormInput  handleChange={this.handleChange} type="email" name="email" label='email' value={this.state.email} required/>
                <FormInput handleChange={this.handleChange} type="password" name="password" label='password' value={this.state.password} required/>
                <CustomButton type='submit'>Sign In</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;