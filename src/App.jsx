import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';

/**
 * Goal: Allow the user to start guessing the letters
 * 
 * Challenge: Create a new array in state to hold user's
 * guessed letters. When the user chooses a letter, add 
 * that letter to this state array.
 * 
 * Don't worry about whether it was right or wrong guess yet.
 */

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState("react");

  const [guessedLetters, setguessedLetters] = useState([]);
  console.log(guessedLetters)

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

  const letterElements = currentWord.toUpperCase().split("").map((char, index) => {
    return (
      <span key={index}>{char}</span>
    ) 
  })

  const keyboardElements = alphabet.toUpperCase().split("").map((char, index) => {
    return (
      <button 
        key={index}
        onClick={() => addGuessedLetter(char)}
      >
        {char}
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