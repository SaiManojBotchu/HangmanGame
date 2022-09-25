import React, { Component } from 'react';
import { randomWord } from "./word";

import './Hangman.css';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      word: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.word.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    const ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.word.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  }

  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const altText = `${this.state.nWrong} wrong guesses`;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}/>
        <p>{`Guessed wrong: ${this.state.nWrong} / ${this.props.maxWrong}`}</p>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.word}</p>
        <p className='Hangman-btns'>{!gameOver ? this.generateButtons() : 'You lose'}</p>
      </div>
    );
  }
}

export default Hangman;
