import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';

/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge: Derive a variable (`wrongGuessCount`) for the 
 * number of incorrect guesses by using the other state 
 * values we're already holding in the component.
 * 
 * console.log the wrongGuessCount for now
 */

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setguessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter((char) => !currentWord.includes(char));
  console.log(wrongGuessCount.length)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  
  function addGuessedLetter(letter) {
    setguessedLetters(prevLetters => 
      prevLetters.includes(letter) ? 
        prevLetters : 
        [...prevLetters, letter]
    )
  }

  const languageElements = languages.map((language) => {
    return (
      <span
        key={language.name}
        style={
          {
            backgroundColor: language.backgroundColor,
            color: language.color
          }
        }
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

      <button className="new-game">New Game</button>

    </main>
  )
}