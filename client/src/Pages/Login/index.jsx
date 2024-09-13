import React, { useState } from 'react';
import classes from './index.module.css';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, validateEmail } from '../../Config/apiUrl';
import { Post } from '../../AxiosFunction/AxiosFunction';
import { useDispatch } from "react-redux";
import { authReducer } from '../../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigateSignUp  = () => { navigate('/SignUp'); }

  const handleLogin = async () => {
    const apiUrl = BaseUrl("auth/login");
    const body = { email, password };

    for (let key in body) {
      if (body[key] === "" || body[key] === null) {
        alert("Please Fill All Fields") 
      }
    }

    if (!validateEmail(body.email)) {
      alert("Please enter a valid email")
      
    }

    setIsLoading(true);
    const response = await Post(apiUrl, body);

    if (response !== undefined) {
      console.log(response.data)
      await dispatch(authReducer(response.data));
      alert("Login Successfully")
     
      navigate("/play");
    } else {
      alert("Login Failed")
      
    }
    
    setIsLoading(false);
  };

  return (
    <div className={classes.login}>
      <h1>Login Form</h1>

      <Input label={"Email"} setter={setEmail} value={email} placeholder={"Enter Email"} type={"text"} />
      <Input label={"Password"} setter={setPassword} value={password} placeholder={"Enter Password"} type={"password"} />

      <Button label={"Submit"} onClick={handleLogin} customStyle={{ 'padding': '15px 150px', 'backgroundColor': 'aqua', 'border': '3px solid white', 'borderRadius': '15px' }} />
      <Button label={"Sign Up"} onClick={navigateSignUp} customStyle={{ 'padding': '10px 150px', 'backgroundColor': 'white', 'border': '3px solid white', 'borderRadius': '15px' }} />
    </div>
  );
};

export default Login;
