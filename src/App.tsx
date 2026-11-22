import { sons, audioUrl } from './data/sons'

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 24 }}>
      {sons.map((son) => (
        <button
          key={son.id}
          onClick={() => new Audio(audioUrl(son)).play()}
          style={{ fontSize: 32, padding: '16px 24px', borderRadius: 16 }}
        >
          {son.emoji} {son.texte}
        </button>
      ))}
    </div>
  )
}

export default App