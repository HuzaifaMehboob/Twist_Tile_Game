import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import SingleCard from '../../Components/SingleCard';
import { cardImages } from './card_images.js';
import Navbar from '../../Components/Navbar/index.jsx';


const Play = () => {


    // Handling Card data, score, turns, and time
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [turns, setTurns] = useState(0);
    const [timeOver, setTimeOver] = useState(false);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [consecutiveMatches, setConsecutiveMatches] = useState(0); 

   
    // Handling the card choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                handleScoreUpdate();
                resetTurn();
            } else {
                alert("Cards didn't match");
                setConsecutiveMatches(0); 
                resetTurn();
            }
        }
    }, [choiceOne, choiceTwo]);

    
    const handleScoreUpdate = () => {
        setScore((prevScore) => prevScore + 10);
        setConsecutiveMatches((prev) => prev + 1); 

       
        if (consecutiveMatches + 1 === 3) {
            setScore((prevScore) => prevScore + 30); 
            setConsecutiveMatches(0);
        }
    };

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
    };

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
        setTimeOver(false); 
        setScore(0); 
        setConsecutiveMatches(0); 
    };

    return (
        <div className={classes.game_page}>
            <Navbar 
                setTimeOver={setTimeOver}
                timeOver={timeOver}
                score={score}
                turns={turns}
                shuffleCards={shuffleCards}
            />

            <div className={classes.play}>
                <div className={classes.card_grid}>
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            handleChoice={handleChoice}
                            card={card}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Play;
