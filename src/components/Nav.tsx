import type { View } from '../types.ts'

const TABS: { id: View; label: string; icon: string }[] = [
  { id: 'home', label: 'Дом', icon: '⌂' },
  { id: 'shop', label: 'Магазин', icon: '✦' },
  { id: 'wardrobe', label: 'Гардероб', icon: '♡' },
  { id: 'party', label: 'Вечеринка', icon: '✧' },
  { id: 'friends', label: 'Подруги', icon: '☺' },
]

export function Nav({ view, onChange }: { view: View; onChange: (view: View) => void }) {
  return (
    <nav className="tabbar" aria-label="Навигация">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={view === tab.id ? 'tab active' : 'tab'}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
