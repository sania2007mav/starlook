import type { ClothingItem, Outfit } from '../types.ts'

export function applyItem(outfit: Outfit, item: ClothingItem): Outfit {
  const next: Outfit = { ...outfit }

  if (item.category === 'dress') {
    delete next.top
    delete next.bottom
    next.dress = item.id
    return next
  }

  if (item.category === 'top' || item.category === 'bottom') {
    delete next.dress
    next[item.category] = item.id
    return next
  }

  next[item.category] = item.id
  return next
}

export function toggleItem(outfit: Outfit, item: ClothingItem): Outfit {
  if (outfit[item.category] === item.id) {
    const next: Outfit = { ...outfit }
    delete next[item.category]
    return next
  }
  return applyItem(outfit, item)
}

export function outfitScore(outfit: Outfit): number {
  let score = 0
  if (outfit.hair) score += 1
  if (outfit.shoes) score += 1
  if (outfit.accessory) score += 1
  if (outfit.dress || (outfit.top && outfit.bottom)) score += 2
  else if (outfit.top || outfit.bottom) score += 1
  return score
}
