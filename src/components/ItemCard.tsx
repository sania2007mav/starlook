import type { ClothingItem } from '../types.ts'
import { ItemThumb } from './ItemThumb.tsx'

type ItemCardProps = {
  item: ClothingItem
  selected?: boolean
  owned?: boolean
  equipped?: boolean
  showPrice?: boolean
  onSelect: () => void
}

export function ItemCard({
  item,
  selected,
  owned,
  equipped,
  showPrice = true,
  onSelect,
}: ItemCardProps) {
  return (
    <button
      type="button"
      className={`item-card${selected ? ' selected' : ''}${equipped ? ' equipped' : ''}`}
      onClick={onSelect}
    >
      <ItemThumb item={item} />
      <span className="item-name">{item.name}</span>
      {showPrice ? (
        <span className="item-meta">{owned ? 'Куплено' : `★ ${item.price}`}</span>
      ) : (
        <span className="item-meta">{equipped ? 'Надето' : 'Надеть'}</span>
      )}
    </button>
  )
}
