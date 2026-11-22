import { useEffect, useMemo, useState } from 'react'
import { sons, audioUrl, type Niveau, type Son } from '../data/sons'
import { creerQuestion } from './logique'
import { jouerSon } from '../utils/audio'

interface Props {
  niveau: Niveau
  onQuitter: () => void
}

export default function JeuDesSons({ niveau, onQuitter }: Props) {
  const sonsDuNiveau = useMemo(() => sons.filter((s) => s.niveau === niveau), [niveau])
  const [question, setQuestion] = useState(() => creerQuestion(sonsDuNiveau))
  const [gagne, setGagne] = useState(false)
  const [erreurId, setErreurId] = useState<string | null>(null)
  const [etoiles, setEtoiles] = useState(0)

  // Joue le son à chaque nouvelle question
  useEffect(() => {
    jouerSon(audioUrl(question.cible))
  }, [question])

  const repondre = (son: Son) => {
    if (gagne) return
    if (son.id === question.cible.id) {
      setGagne(true)
      setEtoiles((e) => e + 1)
      setTimeout(() => {
        setQuestion(creerQuestion(sonsDuNiveau, question.cible))
        setGagne(false)
      }, 1200)
    } else {
      setErreurId(son.id)
      setTimeout(() => setErreurId(null), 500)
    }
  }

  const classe = (son: Son) => {
    if (gagne && son.id === question.cible.id) return 'carte carte--juste'
    if (son.id === erreurId) return 'carte carte--erreur'
    return 'carte'
  }

  return (
    <main className="jeu">
      <header>
        <button className="btn-retour" onClick={onQuitter}>🏠</button>
        <span>⭐ {etoiles}</span>
      </header>

      <button className="btn-ecouter" onClick={() => jouerSon(audioUrl(question.cible))}>
        🔊
      </button>

      <div className="choix">
        {question.choix.map((son) => (
          <button key={son.id} className={classe(son)} onClick={() => repondre(son)}>
            {son.texte}
          </button>
        ))}
      </div>

      {gagne && <p className="bravo">Bravo ! 🎉</p>}
    </main>
  )
}