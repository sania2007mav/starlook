import { useGame } from '../store.tsx'
import type { View } from '../types.ts'

const TITLES: Record<View, string> = {
  home: 'StarLook',
  shop: 'Магазин',
  wardrobe: 'Гардероб',
  party: 'Вечеринка',
  friends: 'Подруги',
}

export function Header({ view }: { view: View }) {
  const { save } = useGame()
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">мода · стиль · вечеринки</p>
        <h1>{TITLES[view]}</h1>
      </div>
      <div className="coins" aria-label="Монеты">
        <span className="coin-icon" aria-hidden="true">
          ★
        </span>
        <strong>{save.coins}</strong>
      </div>
    </header>
  )
}
