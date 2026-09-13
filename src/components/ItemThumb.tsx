import type { ClothingItem } from '../types.ts'

export function ItemThumb({ item }: { item: ClothingItem }) {
  const { primary, secondary, accent } = item.colors
  return (
    <svg viewBox="0 0 80 80" className="thumb" aria-hidden="true">
      <rect width="80" height="80" rx="16" fill="rgba(255,255,255,0.55)" />
      {item.category === 'hair' ? (
        <path d="M22 30c0-16 36-16 36 0v22c-4 14-32 14-36 0z" fill={primary} />
      ) : null}
      {item.category === 'top' ? (
        <path d="M18 28 32 22l8 8 8-8 14 6-6 28H24z" fill={primary} />
      ) : null}
      {item.category === 'bottom' ? (
        <path d="M26 20h28l6 40H20z" fill={primary} />
      ) : null}
      {item.category === 'dress' ? (
        <path d="M30 16h20l6 10 10 38H14L24 26z" fill={primary} />
      ) : null}
      {item.category === 'shoes' ? (
        <g>
          <ellipse cx="28" cy="48" rx="12" ry="8" fill={primary} />
          <ellipse cx="54" cy="48" rx="12" ry="8" fill={secondary} />
        </g>
      ) : null}
      {item.category === 'accessory' ? (
        <g>
          <circle cx="40" cy="36" r="12" fill={primary} />
          <circle cx="40" cy="36" r="6" fill={accent} />
        </g>
      ) : null}
    </svg>
  )
}
