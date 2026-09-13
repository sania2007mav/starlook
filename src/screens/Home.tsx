import { Doll } from '../components/Doll.tsx'
import { useGame } from '../store.tsx'
import type { View } from '../types.ts'

const TILES: { id: View; title: string; text: string }[] = [
  { id: 'shop', title: 'Магазин', text: 'Примерить и купить вещи' },
  { id: 'wardrobe', title: 'Гардероб', text: 'Собрать образ для куклы' },
  { id: 'party', title: 'Вечеринка', text: 'Выйти в свет в новом луке' },
  { id: 'friends', title: 'Подруги', text: 'Посмотреть чужие образы' },
]

export function Home({ onNavigate }: { onNavigate: (view: View) => void }) {
  const { save, reset } = useGame()

  return (
    <section className="screen home">
      <div className="hero-card">
        <p className="kicker">Привет, звезда</p>
        <h2>Готова блистать сегодня?</h2>
        <div className="hero-doll">
          <Doll outfit={save.equipped} size={168} />
        </div>
        <div className="stats">
          <div>
            <span>Вещей</span>
            <strong>{save.ownedIds.length}</strong>
          </div>
          <div>
            <span>Вечеринок</span>
            <strong>{save.partyCount}</strong>
          </div>
        </div>
      </div>

      <div className="tile-grid">
        {TILES.map((tile) => (
          <button key={tile.id} type="button" className="tile" onClick={() => onNavigate(tile.id)}>
            <strong>{tile.title}</strong>
            <span>{tile.text}</span>
          </button>
        ))}
      </div>

      <button type="button" className="ghost-btn" onClick={reset}>
        Сбросить прогресс
      </button>
    </section>
  )
}
