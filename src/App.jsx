import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';
import { getFarewellText } from './assets/utils';

/**
 * Backlog:
 * 
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * - Make the New Game button reset the game
 * - Choose a random word from a list of words
 * - Confetti drop when the user wins
 * 
 * Challenge: Disable the keyboard when the game is over
 */

export default function AssemblyEndgame() {

  //state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setguessedLetters] = useState([]);


  //derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetters.filter(char => !currentWord.includes(char));
  const isGameWon = currentWord.split("").every(char => guessedLetters.includes(char))
  const isGameLost = languages.length <= wrongGuessCount.length;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter) 

  console.log(isLastGuessWrong)
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

  const keyboardElements = alphabet.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
        className={className}
        key={index}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function gameOver() {
    setguessedLetters([])
  }


  const className =clsx("game-status",
    {
      wrong: !isGameOver && isLastGuessWrong,
      win: isGameWon,
      lost: isGameLost
    }
  )

  function renderGameStatus() {
    if (!isGameOver && isLastGuessWrong) {
      return ( 
        <h2 className={className}>{getFarewellText(languages[wrongGuessCount.length - 1].name)}</h2>
      )
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } 
    
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly son 😭</p>
        </>
      )
    } 
    
    else {
      return null
    }
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section 
        aria-live="polite" 
        role="status"
        className={className}
      >
          {renderGameStatus()}
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section 
        className="sr-only" 
        aria-live="polite" 
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ? 
            `Correct! The letter ${lastGuessedLetter} is in the word` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word`
          }
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word: {currentWord.split("").map(letter => 
          guessedLetters.includes(letter) ? letter + "." : "blank.")
          .join(" ")}
        </p>
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