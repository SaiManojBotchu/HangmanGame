// wrote for practice - functional implementation
import React, { useState } from 'react';
import { randomWord } from './word';
import './Hangman.css';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

function Hangman1({ maxWrong = 6, images = [img0, img1, img2, img3, img4, img5, img6] }) {
  const [nWrong, setNWrong] = useState(0);
  const [word, setWord] = useState(randomWord());
  const [guessed, setGuessed] = useState(new Set());

  const reset = () => {
    setNWrong(0);
    setWord(randomWord());
    setGuessed(new Set());
  };

  const guessedWord = () => {
    return word.split('').map((ltr) => (guessed.has(ltr) ? ltr : '_'));
  };

  const handleGuess = (evt) => {
    const ltr = evt.target.value;
    setGuessed((prevSet) => new Set(prevSet).add(ltr));
    setNWrong((prevState) => prevState + (word.includes(ltr) ? 0 : 1));
  };

  const generateButtons = () => {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button key={ltr} value={ltr} onClick={handleGuess} disabled={guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  };

  let gameState = generateButtons();
  let gameWord = guessedWord();
  const gameWin = gameWord.join('') === word;
  const gameOver = nWrong >= maxWrong;
  if (gameOver) {
    gameWord = word;
    gameState = 'You lose';
  }
  if (gameWin) {
    gameState = 'You win';
  }

  return (
    <div className='Hangman'>
      <h1>Hangman</h1>
      <img src={images[nWrong]} alt={`${nWrong}/${maxWrong}`} />
      <p>Guessed wrong: {nWrong} / {maxWrong}</p>
      <p className='Hangman-word'>{gameWord}</p>
      <div className='Hangman-btns'>{gameState}</div>
      <button id='reset' onClick={reset}>Reset</button>
    </div>
  );
}

export default Hangman1;
