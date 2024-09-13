import React from 'react'
import classes from './index.module.css'

const SingleCard = ({ card , handleChoice, flipped }) => {
    console.log(card)
    const handleClick = () =>{
        handleChoice(card)
    }
    return (
        <div className={classes.card}>
            <div className={flipped ?  `${classes.flipped}` : ""}>
                <img 
                    className={classes.front}
                    src={card.src} 
                    alt='card' 
                />
            
            
                <img 
                    className={classes.cover}
                    src='/assets/cover_image.jpg'
                    onClick={handleClick} 
                    alt='cover image' 
                />
            
            </div>
        </div>
    )
}

export default SingleCard