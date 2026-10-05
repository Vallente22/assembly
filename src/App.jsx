import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';

/**
 * Backlog:
 * 
 * - farewell messages for every wrong guess in status section
 * - fix a11y(accessibility) issues
 * - make new game button work
 * - choose a random word from a list of words
 * - confetti drop when the user wins
 */

export default function AssemblyEndgame() {

  //state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setguessedLetters] = useState([]);


  //derived values
  const wrongGuessCount = guessedLetters.filter(char => !currentWord.includes(char));
  const isGameWon = currentWord.split("").every(char => guessedLetters.includes(char))
  const isGameLost = languages.length <= wrongGuessCount.length;
  const isGameOver = isGameWon || isGameLost;

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

  function renderGameStatus() {
    if (!isGameOver) {
      return null
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly son 😭</p>
        </>
      )
    }
  }


  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className={clsx("game-status",
        {
          win: isGameWon,
          lost: isGameLost
        })}
      >
        {renderGameStatus()}
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

      {isGameOver && <button 
        className="new-game"
        onClick={gameOver}
      >
        New Game
      </button>}

    </main>
  )
}