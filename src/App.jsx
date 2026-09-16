import { useState } from 'react'
import './App.css'

/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: Build a status section below the header.
 * For now, you can just hard-code in the styles for
 * a winning game, and we'll make it more dynamic
 * later.
 */

export default function AssemblyEndgame() {
  const [isGameWon, setIsGameWon] = useState(true);

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
    </main>
  )
}