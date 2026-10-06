import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';
import clsx from 'clsx';
import { getFarewellText } from './assets/utils';

/**
 * Challenge: Bid farewell to each programming language
 * as it gets erased from existance 👋😭
 * 
 * Use the `getFarewellText` function from the new utils.js
 * file to generate the text.
 * 
 * Check hint.md if you're feeling stuck, but do your best
 * to solve the challenge without the hint! 🕵️
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
  const lastGuessed = guessedLetters[guessedLetters.length - 1]
  const isLastGuessWrong = lastGuessed && !currentWord.includes(lastGuessed) 

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

      <section className={className}>
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