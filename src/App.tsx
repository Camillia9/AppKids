import { useState } from 'react'
import Accueil from './components/Acceuil'
import JeuDesSons from './game/JeuDesSons'
import type { Niveau } from './data/sons'

function App() {
  const [niveau, setNiveau] = useState<Niveau | null>(null)

  if (niveau === null) return <Accueil onJouer={setNiveau} />
  return <JeuDesSons niveau={niveau} onQuitter={() => setNiveau(null)} />
}

export default App