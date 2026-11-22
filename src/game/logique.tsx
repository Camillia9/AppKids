import type { Son } from '../data/sons'

export interface Question {
  cible: Son
  choix: Son[]
}

export function melanger<T>(tableau: T[]): T[] {
  const copie = [...tableau]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}

export function choisirCible(sons: Son[], precedente?: Son): Son {
  const candidats = sons.filter((s) => s.id !== precedente?.id)
  return candidats[Math.floor(Math.random() * candidats.length)]
}

export function creerQuestion(sons: Son[], precedente?: Son): Question {
  const cible = choisirCible(sons, precedente)
  const distracteurs = melanger(sons.filter((s) => s.id !== cible.id)).slice(0, 2)
  return { cible, choix: melanger([cible, ...distracteurs]) }
}

// --- Jeu des syllabes ---

export function lettresDisponibles(syllabes: Son[]) {
  const consonnes = new Set<string>()
  const voyelles = new Set<string>()
  for (const s of syllabes) {
    if (s.lettres) {
      consonnes.add(s.lettres[0])
      voyelles.add(s.lettres[1])
    }
  }
  return { consonnes: [...consonnes], voyelles: [...voyelles] }
}

export function estBonneSyllabe(cible: Son, consonne: string, voyelle: string): boolean {
  return cible.lettres?.[0] === consonne && cible.lettres?.[1] === voyelle
}