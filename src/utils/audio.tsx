const lecteur = new Audio()

export function debloquerAudio() {
  lecteur.muted = true
  lecteur.src = '/sounds/a.m4a'
  lecteur.play().catch(() => {})
}

export function jouerSon(url: string) {
  lecteur.muted = false
  lecteur.src = url
  lecteur.play().catch(() => {})
}