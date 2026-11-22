import { describe, it, expect } from 'vitest'
import { melanger, creerQuestion, lettresDisponibles, estBonneSyllabe } from './logique'
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

const syllabes = sons.filter((s) => s.niveau === 'syllabe')

describe('jeu des syllabes', () => {
  it('trouve les consonnes et les voyelles à partir des données', () => {
    const { consonnes, voyelles } = lettresDisponibles(syllabes)
    expect(consonnes.sort()).toEqual(['l', 'm', 'r'])
    expect(voyelles.sort()).toEqual(['a', 'i', 'o', 'u'])
  })

  it('valide la bonne syllabe et refuse une mauvaise', () => {
    const ma = syllabes.find((s) => s.id === 'ma')!
    expect(estBonneSyllabe(ma, 'm', 'a')).toBe(true)
    expect(estBonneSyllabe(ma, 'l', 'a')).toBe(false)
  })
})