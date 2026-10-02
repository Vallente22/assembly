import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';

/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge: When mapping over the languages, determine how
 * many of them have been "lost" and add the "lost" class if
 * so.
 * 
 * Hint: use the wrongGuessCount combined with the index of
 * the item in the array while inside the languages.map code
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