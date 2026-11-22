import { useState } from 'react'
import Accueil from './components/Acceuil'
import JeuDesSons from './game/JeuDesSons'
import JeuSyllabes from './game/JeuSyllabes'
import type { Partie } from './types'

function App() {
  const [partie, setPartie] = useState<Partie | null>(null)
  const quitter = () => setPartie(null)

  if (partie === null) return <Accueil onJouer={setPartie} />
  if (partie.jeu === 'sons') return <JeuDesSons niveau={partie.niveau} onQuitter={quitter} />
  return <JeuSyllabes onQuitter={quitter} />
}

export default App