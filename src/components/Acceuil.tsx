import type { Niveau } from '../data/sons'
import { debloquerAudio } from '../utils/audio'

interface Props {
  onJouer: (niveau: Niveau) => void
}

export default function Accueil({ onJouer }: Props) {
  const choisir = (niveau: Niveau) => {
    debloquerAudio()
    onJouer(niveau)
  }

  return (
    <main className="accueil">
      <h1 className="titre">📚 Lis avec moi</h1>
      <div className="niveaux">
        <button className="btn-niveau" onClick={() => choisir('voyelle')}>a i o</button>
        <button className="btn-niveau" onClick={() => choisir('syllabe')}>la mi ro</button>
      </div>
    </main>
  )
}