import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import Button from '../../Components/Button';
import { BaseUrl } from '../../Config/apiUrl';
import { Get } from '../../AxiosFunction/AxiosFunction';

const Scoreboard = () => {
  const [scores, setScores] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchScores = async () => {
      const apiUrl = BaseUrl('auth/topscores');
      try {
        setLoading(true);
        const response = await Get(apiUrl); // Axios directly throws an error for non-200 responses
        setScores(response.data); // Use response.data to get the JSON response
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchScores(); 
  }, []); 

  return (
    <div className={classes.dash}>
      <div className={classes.scoredash}>
        <Button
          label={"Back"}
          customStyle={{
            backgroundColor: 'gray',
            height: '70%',
            width: '10%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <h2 style={{ margin: 'auto' }}>Scoreboard</h2>
      </div>

      {loading && <p>Loading scores...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          {scores.map((score, index) => (
            <div key={index} className={classes.score}>
            <p>{index+1}</p>
            <p>{score.username}</p>
            <p> {score.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
