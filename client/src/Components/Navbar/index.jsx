import React, { useState, useEffect } from 'react';
import classes from './index.module.css';
import Button from '../Button/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Patch } from '../../AxiosFunction/AxiosFunction.js'; // Updated: Import Patch
import { authReducer } from '../../redux/authSlice.js';
import { BaseUrl } from '../../Config/apiUrl.js';

const Navbar = ({ shuffleCards, setTimeOver, score, turns, timeOver }) => {
  const { user } = useSelector((state) => state.authReducer); // Get user from Redux

  const [turntime, setTime] = useState(60);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        setTimeOver(true);
        alert("Time's up!");
        return 0;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleTimeOver = async () => {
    if (user && score > user.score) {
      const apiUrl = BaseUrl('auth/update');
      
      const body = { 
        email: user.email, 
        score: score
      };
      const response = await Patch(apiUrl, body);
  
      if (response && response.data) {
        const updatedUser = response.data.user; // Get the updated user object
        await dispatch(authReducer({ 
          user: { 
            ...user,  // Retain existing user properties
            ...updatedUser // Update only the changed ones
          }
        }));
        alert("Score Updated Successfully");
        navigate("/play");
      } else {
        alert("Score Update Failed");
      }
    }
  };

  useEffect(() => {
    if (timeOver) {
      handleTimeOver();
    }
  }, [timeOver]);

  return (
    <div className={classes.nav}>
      {timeOver ? (
        <div className={classes.setting}>
          <h5>Total Score: {score}</h5>
        </div>
      ) : (
        <div className={classes.setting}>
          <h5>Score: {score}</h5>
          <h5>Turns: {turns}</h5>
          <h5>Time: {turntime}</h5>
        </div>
      )}
      <h1 style={{ marginLeft: '100px' }}>Tropical Tile Twist</h1>
      <div className={classes.setting}>
        <Button
          onClick={shuffleCards}
          label={"New Game"}
          customStyle={{ padding: '10px' }}
        />
        <Button
          onClick={() => navigate('/Scoreboard')}
          label={"Scoreboard"}
          customStyle={{ padding: '10px' }}
        />

        {user && (
          <div className={classes.profile}>
            <h5>{user?.username}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
