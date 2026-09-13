import { useMemo, useState } from 'react'
import { ItemCard } from '../components/ItemCard.tsx'
import { Doll } from '../components/Doll.tsx'
import { CATALOG, CATEGORIES, getItem } from '../data/catalog.ts'
import { previewOutfit, useGame } from '../store.tsx'
import type { Category } from '../types.ts'

export function Shop() {
  const { save, buy, isOwned } = useGame()
  const [category, setCategory] = useState<Category>('dress')
  const [selectedId, setSelectedId] = useState<string>(
    CATALOG.find((item) => item.category === 'dress')?.id ?? CATALOG[0].id,
  )

  const items = useMemo(
    () => CATALOG.filter((item) => item.category === category),
    [category],
  )
  const selected = getItem(selectedId)
  const preview = selected ? previewOutfit(save.equipped, selected.id) : save.equipped
  const owned = selected ? isOwned(selected.id) : false

  return (
    <section className="screen split-screen">
      <div className="preview-pane">
        <Doll outfit={preview} size={150} />
        {selected ? (
          <div className="preview-info">
            <h2>{selected.name}</h2>
            <p>{owned ? 'Уже в гардеробе' : `Цена ★ ${selected.price}`}</p>
            <button
              type="button"
              className="primary-btn"
              disabled={owned}
              onClick={() => buy(selected.id)}
            >
              {owned ? 'Куплено' : 'Купить'}
            </button>
          </div>
        ) : null}
      </div>

      <div className="list-pane">
        <div className="chips" role="tablist">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={category === tab.id}
              className={category === tab.id ? 'chip active' : 'chip'}
              onClick={() => {
                setCategory(tab.id)
                const first = CATALOG.find((item) => item.category === tab.id)
                if (first) setSelectedId(first.id)
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              selected={item.id === selectedId}
              owned={isOwned(item.id)}
              onSelect={() => setSelectedId(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
