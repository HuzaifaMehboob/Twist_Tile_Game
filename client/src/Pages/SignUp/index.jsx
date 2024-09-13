import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { isSignout } from '../../redux/authSlice';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import DropDown from '../../Components/DropDown';
import { BaseUrl, validateEmail } from '../../Config/apiUrl';
import { Post } from '../../AxiosFunction/AxiosFunction';
import classes from './index.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  
  useEffect(() => {
    dispatch(isSignout()); 
  }, [dispatch]); 

  const handleSignup = async () => {
    const apiUrl = BaseUrl('auth/signup');
    const body = {
      name,
      email,
      gender: gender.value,
      password,
    };
    console.log('Body', body);

    // Validation checks
    for (let key in body) {
      if (body[key] === '' || body[key] == null) {
        alert('Please fill all fields');
        return;
      }
    }

    if (body.password !== confirmPassword) {
      alert('The password and confirmation password do not match.');
      return;
    }

    if (!validateEmail(body.email)) {
      alert('Please fill valid Email');
      return;
    }

    if (body.password.length < 8) {
      alert('Password should be greater than 8 characters');
      return;
    }

    setIsLoading(true);
    const response = await Post(apiUrl, body);

    if (response !== undefined) {
      alert('SignUp Successfully');
      navigate('/login');
    }
    setIsLoading(false);
  };

  const handleLoginUp = () =>{
    navigate('/Login')
  }
  return (
    <div className={classes.signup}>
      <h1>SignUp Form</h1>

      <Input
        label={'UserName'}
        setter={setName}
        value={name}
        placeholder={'Enter Name'}
        type={'text'}
      />

      <Input
        label={'Email'}
        setter={setEmail}
        value={email}
        placeholder={'Enter Email'}
        type={'text'}
      />

      <DropDown
        setter={setGender}
        value={gender}
        option={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
        label={'Gender'}
        placeholder={'Gender'}
      />

      <Input
        label={'Password'}
        setter={setPassword}
        value={password}
        placeholder={'Enter Password'}
        type={'password'}
      />

      <Input
        label={'Confirm Password'}
        setter={setConfirmPassword}
        value={confirmPassword}
        placeholder={'Enter Confirm Password'}
        type={'password'}
      />

      <Button
        label={'Submit'}
        onClick={handleSignup}
        customStyle={{
          padding: '10px 150px',
          backgroundColor: 'aqua',
          border: '3px solid white',
          borderRadius: '15px',
        }}
      />
       <Button
        label={'Login'}
        onClick={handleLoginUp}
        customStyle={{
          padding: '10px 150px',
          backgroundColor: 'aqua',
          border: '3px solid white',
          borderRadius: '15px',
        }}
      />
    </div>
  );
};

export default SignUp;
