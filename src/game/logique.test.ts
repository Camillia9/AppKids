import { describe, it, expect } from 'vitest'
import { melanger, creerQuestion } from './logique'
import { sons } from '../data/sons'

const voyelles = sons.filter((s) => s.niveau === 'voyelle')

describe('melanger', () => {
  it('garde exactement les mêmes éléments, sans modifier l’original', () => {
    const original = [1, 2, 3, 4, 5]
    const resultat = melanger(original)

    expect(resultat).toHaveLength(5)
    expect([...resultat].sort()).toEqual([1, 2, 3, 4, 5])
    expect(original).toEqual([1, 2, 3, 4, 5])
  })
})

describe('creerQuestion', () => {
  it('propose 3 choix différents, dont la bonne réponse', () => {
    const question = creerQuestion(voyelles)
    const ids = question.choix.map((s) => s.id)

    expect(ids).toHaveLength(3)
    expect(new Set(ids).size).toBe(3)
    expect(ids).toContain(question.cible.id)
  })

  it('ne repose jamais deux fois de suite le même son', () => {
    let precedente = voyelles[0]
    for (let i = 0; i < 100; i++) {
      const question = creerQuestion(voyelles, precedente)
      expect(question.cible.id).not.toBe(precedente.id)
      precedente = question.cible
    }
  })
})