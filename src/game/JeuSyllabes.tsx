import { useEffect, useMemo, useState } from 'react'
import { sons, audioUrl } from '../data/sons'
import { choisirCible, lettresDisponibles, estBonneSyllabe } from './logique'
import { jouerSon } from '../utils/audio'

interface Props {
  onQuitter: () => void
}

type Etat = 'jeu' | 'gagne' | 'erreur'

export default function JeuSyllabes({ onQuitter }: Props) {
  const syllabes = useMemo(() => sons.filter((s) => s.niveau === 'syllabe'), [])
  const { consonnes, voyelles } = useMemo(() => lettresDisponibles(syllabes), [syllabes])

  const [cible, setCible] = useState(() => choisirCible(syllabes))
  const [consonne, setConsonne] = useState<string | null>(null)
  const [voyelle, setVoyelle] = useState<string | null>(null)
  const [etat, setEtat] = useState<Etat>('jeu')
  const [etoiles, setEtoiles] = useState(0)

  useEffect(() => {
    jouerSon(audioUrl(cible))
  }, [cible])

  // Vérifie dès que les deux cases sont remplies
  useEffect(() => {
    if (!consonne || !voyelle) return

    if (estBonneSyllabe(cible, consonne, voyelle)) {
      setEtat('gagne')
      setEtoiles((e) => e + 1)
      jouerSon(audioUrl(cible))
      const timer = setTimeout(() => {
        setCible(choisirCible(syllabes, cible))
        setConsonne(null)
        setVoyelle(null)
        setEtat('jeu')
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      setEtat('erreur')
      const timer = setTimeout(() => {
        setConsonne(null)
        setVoyelle(null)
        setEtat('jeu')
        jouerSon(audioUrl(cible)) // on lui refait écouter
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [consonne, voyelle, cible, syllabes])

  const bloque = etat !== 'jeu'
  const classeCase = `case ${etat === 'gagne' ? 'case--juste' : ''} ${etat === 'erreur' ? 'case--erreur' : ''}`

  return (
    <main className="jeu">
      <header>
        <button className="btn-retour" onClick={onQuitter}>🏠</button>
        <span>⭐ {etoiles}</span>
      </header>

      <button className="btn-ecouter" onClick={() => jouerSon(audioUrl(cible))}>🔊</button>

      <div className="cases">
        <button className={classeCase} onClick={() => !bloque && setConsonne(null)}>
          {consonne}
        </button>
        <button className={`${classeCase} lettre--voyelle`} onClick={() => !bloque && setVoyelle(null)}>
          {voyelle}
        </button>
      </div>

      <div className="clavier">
        <div className="rangee">
          {consonnes.map((l) => (
            <button key={l} className="lettre" disabled={bloque} onClick={() => setConsonne(l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="rangee">
          {voyelles.map((l) => (
            <button key={l} className="lettre lettre--voyelle" disabled={bloque} onClick={() => setVoyelle(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}