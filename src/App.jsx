import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';

/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge:
 * 1. Create a variable `isGameOver` which evaluates to `true`
 *    if the user has guessed incorrectly 8 times. Consider how
 *    we might make this more dynamic if we were ever to add or
 *    remove languages from the languages array.
 * 2. Conditionally render the New Game button only if the game
 *    is over.
 */

export default function AssemblyEndgame() {

  //state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setguessedLetters] = useState([]);


  //derived values
  const wrongGuessCount = guessedLetters.filter(char => !currentWord.includes(char));
  const isGameWon = currentWord.split("").every(char => guessedLetters.includes(char))
  const isGameOver = languages.length <= wrongGuessCount.length;

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  
  function addGuessedLetter(letter) {
    setguessedLetters(prevLetters => 
      prevLetters.includes(letter) ? 
        prevLetters : 
        [...prevLetters, letter]
    )
  }

  const languageElements = languages.map((language, index) => {
    const style = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }
    
    const className = clsx(
      "chip",
      {
        lost: index < wrongGuessCount.length
      }
    )

    return (
      <span
        className={className}
        key={language.name}
        style={style}
      >
        {language.name}
      </span>
    )
  })

  const letterElements = currentWord.split("").map((char, index) => {
    return (
      <span key={index}>
        {guessedLetters.includes(char) ? char.toUpperCase() : " "}
      </span>
    ) 
  })

  const keyboardElements = alphabet.split("").map((char, index) => {
    const isGuessed = guessedLetters.includes(char)
    const isCorrect = isGuessed && currentWord.includes(char)
    const isWrong = isGuessed && !currentWord.includes(char)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
        className={className}
        key={index}
        onClick={() => addGuessedLetter(char)}
      >
        {char.toUpperCase()}
      </button>
    )
  })

  function gameOver() {
    setguessedLetters([])
  }


  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameWon && <button 
        className="new-game"
        onClick={gameOver}
      >
        New Game
      </button>}

    </main>
  )
}