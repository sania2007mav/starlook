import { useMemo, useState } from 'react'
import { Doll } from '../components/Doll.tsx'
import { ItemCard } from '../components/ItemCard.tsx'
import { CATALOG, CATEGORIES } from '../data/catalog.ts'
import { useGame } from '../store.tsx'
import type { Category } from '../types.ts'

export function Wardrobe() {
  const { save, equip, isOwned } = useGame()
  const [category, setCategory] = useState<Category>('hair')

  const ownedItems = useMemo(
    () => CATALOG.filter((item) => item.category === category && isOwned(item.id)),
    [category, isOwned],
  )

  return (
    <section className="screen split-screen wardrobe">
      <div className="preview-pane doll-left">
        <p className="pane-label">Образ</p>
        <Doll outfit={save.equipped} size={150} />
      </div>

      <div className="list-pane">
        <p className="pane-label">Мои вещи</p>
        <div className="chips" role="tablist">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={category === tab.id ? 'chip active' : 'chip'}
              onClick={() => setCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {ownedItems.length === 0 ? (
          <p className="empty">Пока пусто. Загляни в магазин!</p>
        ) : (
          <div className="item-grid">
            {ownedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                selected={save.equipped[item.category] === item.id}
                equipped={save.equipped[item.category] === item.id}
                showPrice={false}
                onSelect={() => equip(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
