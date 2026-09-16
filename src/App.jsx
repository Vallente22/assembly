import { useState } from 'react'
import './App.css'
import { languages } from './assets/languages';

/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * Display the keyboard ⌨️. Use <button>s for each letter
 * since it'll need to be clickable and tab-accessible.
 */

export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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
      <button key={index}>{char}</button>
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
    </main>
  )
}