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

export function creerQuestion(sons: Son[], precedente?: Son): Question {
  const candidats = sons.filter((s) => s.id !== precedente?.id)
  const cible = candidats[Math.floor(Math.random() * candidats.length)]
  const distracteurs = melanger(sons.filter((s) => s.id !== cible.id)).slice(0, 2)
  return { cible, choix: melanger([cible, ...distracteurs]) }
}