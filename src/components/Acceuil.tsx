import type { Partie } from '../types'
import { debloquerAudio } from '../utils/audio'

interface Props {
  onJouer: (partie: Partie) => void
}

export default function Accueil({ onJouer }: Props) {
  const choisir = (partie: Partie) => {
    debloquerAudio()
    onJouer(partie)
  }

  return (
    <main className="accueil">
      <h1 className="titre">📚 Lis avec moi</h1>
      <div className="niveaux">
        <button className="btn-niveau" onClick={() => choisir({ jeu: 'sons', niveau: 'voyelle' })}>a i o</button>
        <button className="btn-niveau" onClick={() => choisir({ jeu: 'sons', niveau: 'syllabe' })}>la mi ro</button>
        <button className="btn-niveau" onClick={() => choisir({ jeu: 'syllabes' })}>m + a</button>
      </div>
    </main>
  )
}