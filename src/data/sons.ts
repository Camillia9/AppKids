export type Niveau = 'voyelle' | 'syllabe' | 'mot'

export interface Son {
  id: string          // nom du fichier audio (sans accent)
  texte: string       // ce qu'on affiche à l'écran
  niveau: Niveau
  lettres?: string[]  // syllabes : les lettres à assembler
  emoji?: string      // mots : l'image associée
}

export const sons: Son[] = [
  // Voyelles
  { id: 'a', texte: 'a', niveau: 'voyelle' },
  { id: 'i', texte: 'i', niveau: 'voyelle' },
  { id: 'o', texte: 'o', niveau: 'voyelle' },
  { id: 'u', texte: 'u', niveau: 'voyelle' },
  { id: 'e', texte: 'é', niveau: 'voyelle' },

  // Syllabes
  { id: 'la', texte: 'la', niveau: 'syllabe', lettres: ['l', 'a'] },
  { id: 'li', texte: 'li', niveau: 'syllabe', lettres: ['l', 'i'] },
  { id: 'lo', texte: 'lo', niveau: 'syllabe', lettres: ['l', 'o'] },
  { id: 'lu', texte: 'lu', niveau: 'syllabe', lettres: ['l', 'u'] },
  { id: 'ma', texte: 'ma', niveau: 'syllabe', lettres: ['m', 'a'] },
  { id: 'mi', texte: 'mi', niveau: 'syllabe', lettres: ['m', 'i'] },
  { id: 'mo', texte: 'mo', niveau: 'syllabe', lettres: ['m', 'o'] },
  { id: 'mu', texte: 'mu', niveau: 'syllabe', lettres: ['m', 'u'] },
  { id: 'ra', texte: 'ra', niveau: 'syllabe', lettres: ['r', 'a'] },
  { id: 'ri', texte: 'ri', niveau: 'syllabe', lettres: ['r', 'i'] },
  { id: 'ro', texte: 'ro', niveau: 'syllabe', lettres: ['r', 'o'] },
  { id: 'ru', texte: 'ru', niveau: 'syllabe', lettres: ['r', 'u'] },

  // Mots
  { id: 'lama', texte: 'lama', niveau: 'mot', emoji: '🦙' },
  { id: 'moto', texte: 'moto', niveau: 'mot', emoji: '🏍️' },
  { id: 'rat',  texte: 'rat',  niveau: 'mot', emoji: '🐀' },
  { id: 'ami',  texte: 'ami',  niveau: 'mot', emoji: '👫' },
]

export const audioUrl = (son: Son) => `/sounds/${son.id}.m4a`