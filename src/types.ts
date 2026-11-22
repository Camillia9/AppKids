import type { Niveau } from './data/sons'

export type Partie =
  | { jeu: 'sons'; niveau: Niveau }
  | { jeu: 'syllabes' }