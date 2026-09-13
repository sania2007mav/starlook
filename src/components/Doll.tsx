import { getItem } from '../data/catalog.ts'
import type { Outfit, Palette } from '../types.ts'

const SKIN = '#f3c6b0'
const SKIN_SHADOW = '#e3a994'
const LIP = '#e06b75'
const EYE = '#2b1b24'

type DollProps = {
  outfit: Outfit
  size?: number
  className?: string
}

export function Doll({ outfit, size = 220, className }: DollProps) {
  const hair = getItem(outfit.hair)
  const top = getItem(outfit.top)
  const bottom = getItem(outfit.bottom)
  const dress = getItem(outfit.dress)
  const shoes = getItem(outfit.shoes)
  const accessory = getItem(outfit.accessory)

  return (
    <svg
      className={className}
      width={size}
      height={size * 1.85}
      viewBox="0 0 240 440"
      role="img"
      aria-label="Кукла"
    >
      <ellipse cx="120" cy="418" rx="56" ry="10" fill="rgba(40,10,50,0.18)" />
      {hair ? <HairBack variant={hair.variant} colors={hair.colors} /> : null}
      <Body />
      {shoes ? <Shoes variant={shoes.variant} colors={shoes.colors} /> : <BareFeet />}
      {dress ? (
        <Dress variant={dress.variant} colors={dress.colors} />
      ) : (
        <>
          <Underwear />
          {bottom ? <Bottom variant={bottom.variant} colors={bottom.colors} /> : null}
          {top ? <Top variant={top.variant} colors={top.colors} /> : null}
        </>
      )}
      <Face />
      {hair ? <HairFront variant={hair.variant} colors={hair.colors} /> : null}
      {accessory ? <Accessory variant={accessory.variant} colors={accessory.colors} /> : null}
    </svg>
  )
}

function Body() {
  return (
    <g>
      <path
        d="M102 118c0 8 4 16 18 16s18-8 18-16v-10h-36z"
        fill={SKIN}
      />
      <path
        d="M86 132c-18 18-28 48-22 92 2 14 8 18 16 16 4-1 8-8 9-18l3-48c1-10 8-16 16-16h22c8 0 15 6 16 16l3 48c1 10 5 17 9 18 8 2 14-2 16-16 6-44-4-74-22-92-10-10-42-10-56 0z"
        fill={SKIN}
      />
      <path d="M88 228c2 14 8 36 10 58 1 12 2 40 3 62h16l2-78c1-16 4-28 11-36 7 8 10 20 11 36l2 78h16c1-22 2-50 3-62 2-22 8-44 10-58" fill={SKIN} />
      <ellipse cx="104" cy="392" rx="10" ry="7" fill={SKIN_SHADOW} />
      <ellipse cx="136" cy="392" rx="10" ry="7" fill={SKIN_SHADOW} />
      <circle cx="120" cy="78" r="38" fill={SKIN} />
    </g>
  )
}

function Face() {
  return (
    <g>
      <ellipse cx="106" cy="96" rx="8" ry="4" fill="#f4a6a6" opacity="0.7" />
      <ellipse cx="134" cy="96" rx="8" ry="4" fill="#f4a6a6" opacity="0.7" />
      <ellipse cx="107" cy="78" rx="6.5" ry="7" fill="#fff" />
      <ellipse cx="133" cy="78" rx="6.5" ry="7" fill="#fff" />
      <ellipse cx="108" cy="79" rx="3.2" ry="3.6" fill={EYE} />
      <ellipse cx="134" cy="79" rx="3.2" ry="3.6" fill={EYE} />
      <circle cx="109.4" cy="77.6" r="1.1" fill="#fff" />
      <circle cx="135.4" cy="77.6" r="1.1" fill="#fff" />
      <path d="M100 70c3-4 8-5 11-2" fill="none" stroke={EYE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M129 68c3-4 8-4 11 0" fill="none" stroke={EYE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M118 86c1 3 4 3 5 0" fill="none" stroke="#d49a8c" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M113 97c4 5 11 5 15 0" fill="none" stroke={LIP} strokeWidth="2.1" strokeLinecap="round" />
    </g>
  )
}

function Underwear() {
  return (
    <g>
      <path d="M98 168h44c4 0 6 8 4 16-6 18-12 24-26 24s-20-6-26-24c-2-8 0-16 4-16z" fill="#f7d7cb" />
      <path d="M100 220c6 10 12 14 20 14s14-4 20-14c-8 6-32 6-40 0z" fill="#f0c8ba" />
    </g>
  )
}

function BareFeet() {
  return (
    <g>
      <ellipse cx="104" cy="396" rx="12" ry="6" fill={SKIN} />
      <ellipse cx="136" cy="396" rx="12" ry="6" fill={SKIN} />
    </g>
  )
}

function HairBack({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'waves') {
    return (
      <g>
        <path d="M70 90c-6 40 4 90 18 130 8-40 10-80 8-120C90 70 78 72 70 90z" fill={colors.primary} />
        <path d="M170 90c6 40-4 90-18 130-8-40-10-80-8-120 6-30 18-28 26-10z" fill={colors.primary} />
        <ellipse cx="120" cy="78" rx="48" ry="50" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'bob') {
    return (
      <g>
        <path d="M74 70c-4 30 2 70 16 78 8-20 10-50 8-78-6-18-20-16-24 0z" fill={colors.primary} />
        <path d="M166 70c4 30-2 70-16 78-8-20-10-50-8-78 6-18 20-16 24 0z" fill={colors.primary} />
        <ellipse cx="120" cy="72" rx="46" ry="44" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'pony') {
    return (
      <g>
        <ellipse cx="120" cy="64" rx="42" ry="38" fill={colors.primary} />
        <path d="M128 36c30-8 48 10 52 40 4 28-4 70-10 100-8-40-6-80-12-108-6-20-20-28-30-32z" fill={colors.secondary} />
        <circle cx="148" cy="42" r="10" fill={colors.accent} />
      </g>
    )
  }
  if (variant === 'curls') {
    return (
      <g>
        <circle cx="78" cy="88" r="22" fill={colors.primary} />
        <circle cx="162" cy="88" r="22" fill={colors.primary} />
        <circle cx="84" cy="128" r="18" fill={colors.secondary} />
        <circle cx="156" cy="128" r="18" fill={colors.secondary} />
        <circle cx="96" cy="160" r="16" fill={colors.primary} />
        <circle cx="144" cy="160" r="16" fill={colors.primary} />
        <ellipse cx="120" cy="70" rx="50" ry="48" fill={colors.primary} />
      </g>
    )
  }
  return (
    <g>
      <path d="M78 100c-8 40 0 90 8 130 6-8 10-40 8-70 0-24 4-50 10-70-12-6-22 0-26 10z" fill={colors.primary} />
      <path d="M162 100c8 40 0 90-8 130-6-8-10-40-8-70 0-24-4-50-10-70 12-6 22 0 26 10z" fill={colors.primary} />
      <ellipse cx="120" cy="70" rx="46" ry="42" fill={colors.primary} />
      <path d="M82 210 76 250l10 6 4-40z" fill={colors.accent} />
      <path d="M158 210 164 250l-10 6-4-40z" fill={colors.accent} />
    </g>
  )
}

function HairFront({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'waves') {
    return (
      <g>
        <path d="M82 58c18-28 58-28 76 0 4 8-6 16-16 12-12-4-20 6-22 14-2-8-10-18-22-14-10 4-20-4-16-12z" fill={colors.secondary} />
        <path d="M84 70c-2 30 2 50 8 54 2-20 4-40 2-58-2-6-8-4-10 4z" fill={colors.primary} />
        <path d="M156 70c2 30-2 50-8 54-2-20-4-40-2-58 2-6 8-4 10 4z" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'bob') {
    return (
      <path d="M80 52c20-22 60-22 80 0 6 8-8 14-18 10-14-6-22 8-22 16-0-8-8-22-22-16-10 4-24-2-18-10z" fill={colors.primary} />
    )
  }
  if (variant === 'pony') {
    return (
      <g>
        <path d="M86 54c16-18 52-18 68 0 4 6-8 12-16 8-12-6-16 6-18 12-2-6-6-18-18-12-8 4-20-2-16-8z" fill={colors.primary} />
        <path d="M84 68c0 22 4 36 8 40 1-16 2-30 0-42-2-6-8-4-8 2z" fill={colors.primary} />
        <path d="M156 68c0 22-4 36-8 40-1-16-2-30 0-42 2-6 8-4 8 2z" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'curls') {
    return (
      <g>
        <circle cx="98" cy="52" r="12" fill={colors.secondary} />
        <circle cx="120" cy="46" r="13" fill={colors.primary} />
        <circle cx="142" cy="52" r="12" fill={colors.secondary} />
        <path d="M86 62c8 16 16 18 20 8" fill="none" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" />
        <path d="M154 62c-8 16-16 18-20 8" fill="none" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" />
      </g>
    )
  }
  return (
    <g>
      <path d="M88 50 120 78 152 50c-10-16-44-16-64 0z" fill={colors.secondary} />
      <path d="M86 68c2 20 8 30 12 20" fill="none" stroke={colors.primary} strokeWidth="9" strokeLinecap="round" />
      <path d="M154 68c-2 20-8 30-12 20" fill="none" stroke={colors.primary} strokeWidth="9" strokeLinecap="round" />
    </g>
  )
}

function Top({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'crop') {
    return (
      <path d="M90 134c12-8 48-8 60 0 6 6 8 16 6 28-10 8-20 10-36 10s-26-2-36-10c-2-12 0-22 6-28z" fill={colors.primary} />
    )
  }
  if (variant === 'blouse') {
    return (
      <g>
        <ellipse cx="78" cy="150" rx="16" ry="22" fill={colors.secondary} />
        <ellipse cx="162" cy="150" rx="16" ry="22" fill={colors.secondary} />
        <path d="M88 132c14-10 50-10 64 0 8 10 10 28 6 48-12 10-24 14-38 14s-26-4-38-14c-4-20-2-38 6-48z" fill={colors.primary} />
        <path d="M112 132c6 10 10 10 16 0" fill="none" stroke={colors.accent} strokeWidth="3" />
      </g>
    )
  }
  if (variant === 'sweater') {
    return (
      <g>
        <path d="M70 140c6 20 8 40 8 50h20c-2-18 0-36 6-48 12-10 40-10 52 0 6 12 8 30 6 48h20c0-10 2-30 8-50-16-16-28-20-44-22-12 8-32 8-44 0-16 2-28 6-32 22z" fill={colors.primary} />
        <rect x="108" y="148" width="24" height="8" rx="3" fill={colors.accent} opacity="0.35" />
      </g>
    )
  }
  if (variant === 'tank') {
    return (
      <path d="M98 128c8 6 36 6 44 0 2 6 4 12 2 20 8 6 10 18 8 34-10 10-20 14-32 14s-22-4-32-14c-2-16 0-28 8-34-2-8 0-14 2-20z" fill={colors.primary} />
    )
  }
  return (
    <g>
      <path d="M96 136c10-6 38-6 48 0 4 8 6 22 4 36-8 8-18 12-28 12s-20-4-28-12c-2-14 0-28 4-36z" fill={colors.secondary} />
      <path d="M90 140c8-12 52-12 60 0 2 20 0 40-4 48-10 4-42 4-52 0-4-8-6-28-4-48z" fill={colors.primary} />
    </g>
  )
}

function Bottom({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'jeans') {
    return (
      <g>
        <path d="M96 218c8 8 40 8 48 0 2 20 4 60 6 110h-18l-4-70c-2-16-8-28-8-28s-6 12-8 28l-4 70H90c2-50 4-90 6-110z" fill={colors.primary} />
        <path d="M104 250h12" stroke={colors.accent} strokeWidth="2" />
        <path d="M124 250h12" stroke={colors.accent} strokeWidth="2" />
      </g>
    )
  }
  if (variant === 'mini') {
    return (
      <path d="M94 216c10 8 42 8 52 0 6 10 14 28 16 40-14 8-28 12-42 12s-28-4-42-12c2-12 10-30 16-40z" fill={colors.primary} />
    )
  }
  if (variant === 'wide') {
    return (
      <path d="M96 218c8 6 40 6 48 0 6 24 14 80 22 120H136l-8-70c-2-14-8-24-8-24s-6 10-8 24l-8 70H74c8-40 16-96 22-120z" fill={colors.primary} />
    )
  }
  if (variant === 'flare') {
    return (
      <path d="M94 216c10 8 42 8 52 0 10 16 28 50 34 70-20 6-50 10-60 10s-40-4-60-10c6-20 24-54 34-70z" fill={colors.primary} />
    )
  }
  return (
    <path d="M96 218c8 8 40 8 48 0 2 14 6 36 8 52H88c2-16 6-38 8-52z" fill={colors.primary} />
  )
}

function Dress({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'evening') {
    return (
      <g>
        <path d="M96 132c12-10 36-10 48 0 8 14 8 36 4 52-16 8-40 8-56 0-4-16-4-38 4-52z" fill={colors.primary} />
        <path d="M92 180c16 10 40 10 56 0 8 40 18 120 22 170H70c4-50 14-130 22-170z" fill={colors.secondary} />
        <path d="M108 140h24" stroke={colors.accent} strokeWidth="2" opacity="0.7" />
      </g>
    )
  }
  if (variant === 'summer') {
    return (
      <g>
        <path d="M98 130c10-6 34-6 44 0 4 10 4 22 2 30-14 6-34 6-48 0-2-8-2-20 2-30z" fill={colors.secondary} />
        <path d="M94 158c16 8 36 8 52 0 10 24 28 70 32 100H62c4-30 22-76 32-100z" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'party') {
    return (
      <g>
        <path d="M94 132c14-10 38-10 52 0 6 12 6 28 2 40-16 8-40 8-56 0-4-12-4-28 2-40z" fill={colors.primary} />
        <path d="M92 168c16 10 40 10 56 0 8 16 20 40 24 52-18 8-42 12-52 12s-34-4-52-12c4-12 16-36 24-52z" fill={colors.secondary} />
        <circle cx="120" cy="150" r="3" fill={colors.accent} />
        <circle cx="108" cy="162" r="2.4" fill={colors.accent} />
        <circle cx="132" cy="162" r="2.4" fill={colors.accent} />
      </g>
    )
  }
  if (variant === 'ball') {
    return (
      <g>
        <path d="M98 132c12-8 32-8 44 0 6 14 4 32 0 44-14 6-30 6-44 0-4-12-6-30 0-44z" fill={colors.secondary} />
        <path d="M90 172c18 12 42 12 60 0 20 28 54 90 62 140H28c8-50 42-112 62-140z" fill={colors.primary} />
        <path d="M70 250c16 8 84 8 100 0" fill="none" stroke={colors.accent} strokeWidth="3" opacity="0.7" />
      </g>
    )
  }
  if (variant === 'cocktail') {
    return (
      <g>
        <path d="M96 132c12-8 36-8 48 0 6 16 6 36 2 50-16 6-36 6-52 0-4-14-4-34 2-50z" fill={colors.primary} />
        <path d="M94 178c16 8 36 8 52 0 8 28 16 70 18 96H76c2-26 10-68 18-96z" fill={colors.secondary} />
      </g>
    )
  }
  return (
    <g>
      <path d="M98 132c10-8 34-8 44 0 4 12 4 26 2 36-14 6-34 6-48 0-2-10-2-24 2-36z" fill={colors.primary} />
      <path d="M94 166c16 8 36 8 52 0 10 26 26 74 30 104H64c4-30 20-78 30-104z" fill={colors.secondary} />
      <circle cx="104" cy="200" r="4" fill={colors.accent} />
      <circle cx="120" cy="220" r="4" fill={colors.accent} />
      <circle cx="136" cy="200" r="4" fill={colors.accent} />
      <circle cx="112" cy="248" r="4" fill={colors.accent} />
      <circle cx="128" cy="248" r="4" fill={colors.accent} />
    </g>
  )
}

function Shoes({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'heels') {
    return (
      <g>
        <path d="M92 388h24c2 6-2 10-8 10h-18z" fill={colors.primary} />
        <path d="M92 396v10" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M124 388h24c2 6-2 10-8 10h-18z" fill={colors.primary} />
        <path d="M124 396v10" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }
  if (variant === 'sneakers') {
    return (
      <g>
        <rect x="90" y="386" width="28" height="14" rx="6" fill={colors.primary} stroke={colors.secondary} />
        <rect x="90" y="396" width="28" height="5" rx="2" fill={colors.accent} />
        <rect x="122" y="386" width="28" height="14" rx="6" fill={colors.primary} stroke={colors.secondary} />
        <rect x="122" y="396" width="28" height="5" rx="2" fill={colors.accent} />
      </g>
    )
  }
  if (variant === 'sandals') {
    return (
      <g>
        <ellipse cx="104" cy="396" rx="13" ry="6" fill={colors.primary} />
        <path d="M96 390c6-6 16-6 16 2" fill="none" stroke={colors.accent} strokeWidth="2" />
        <ellipse cx="136" cy="396" rx="13" ry="6" fill={colors.primary} />
        <path d="M128 390c6-6 16-6 16 2" fill="none" stroke={colors.accent} strokeWidth="2" />
      </g>
    )
  }
  if (variant === 'boots') {
    return (
      <g>
        <path d="M94 350h20l4 50H90z" fill={colors.primary} />
        <path d="M126 350h20l4 50h-28z" fill={colors.primary} />
        <path d="M94 388h24" stroke={colors.accent} strokeWidth="2" />
        <path d="M122 388h28" stroke={colors.accent} strokeWidth="2" />
      </g>
    )
  }
  return (
    <g>
      <ellipse cx="104" cy="396" rx="14" ry="7" fill={colors.primary} />
      <ellipse cx="136" cy="396" rx="14" ry="7" fill={colors.primary} />
    </g>
  )
}

function Accessory({ variant, colors }: { variant: string; colors: Palette }) {
  if (variant === 'stars') {
    return (
      <g>
        <Star cx={80} cy={80} r={6} fill={colors.primary} />
        <Star cx={160} cy={80} r={6} fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'necklace') {
    return (
      <g>
        <path d="M102 118c8 16 28 16 36 0" fill="none" stroke={colors.secondary} strokeWidth="2.4" />
        <circle cx="120" cy="134" r="4" fill={colors.accent} />
        <circle cx="112" cy="128" r="2.4" fill={colors.primary} />
        <circle cx="128" cy="128" r="2.4" fill={colors.primary} />
      </g>
    )
  }
  if (variant === 'glasses') {
    return (
      <g>
        <path d="M92 76h20a8 8 0 0 1 8 8 8 8 0 0 1-8 8H96a8 8 0 0 1-8-8 8 8 0 0 1 8-8z" fill="none" stroke={colors.primary} strokeWidth="3" />
        <path d="M128 76h20a8 8 0 0 1 8 8 8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8 8 8 0 0 1 8-8z" fill="none" stroke={colors.primary} strokeWidth="3" />
        <path d="M112 82h16" stroke={colors.primary} strokeWidth="3" />
        <path d="M96 80h12" stroke={colors.secondary} strokeWidth="1.5" opacity="0.6" />
      </g>
    )
  }
  if (variant === 'bag') {
    return (
      <g>
        <path d="M168 220c12-4 28 8 22 24-8 14-28 16-36 6-6-8-2-22 14-30z" fill={colors.primary} />
        <path d="M176 224c4-8 12-8 14-2" fill="none" stroke={colors.accent} strokeWidth="2" />
      </g>
    )
  }
  if (variant === 'crown') {
    return (
      <g>
        <path d="M88 46 100 62h40l12-16-14 6-12-16-12 16z" fill={colors.primary} />
        <circle cx="120" cy="40" r="4" fill={colors.secondary} />
        <circle cx="100" cy="50" r="3" fill={colors.accent} />
        <circle cx="140" cy="50" r="3" fill={colors.accent} />
      </g>
    )
  }
  return (
    <g>
      <Bow cx={86} cy={58} colors={colors} />
      <Bow cx={154} cy={58} colors={colors} />
    </g>
  )
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const points = Array.from({ length: 5 }, (_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180)
    const b = (-54 + i * 72) * (Math.PI / 180)
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r} ${cx + Math.cos(b) * r * 0.42},${cy + Math.sin(b) * r * 0.42}`
  }).join(' ')
  return <polygon points={points} fill={fill} />
}

function Bow({ cx, cy, colors }: { cx: number; cy: number; colors: Palette }) {
  return (
    <g>
      <ellipse cx={cx - 7} cy={cy} rx="7" ry="5" fill={colors.primary} />
      <ellipse cx={cx + 7} cy={cy} rx="7" ry="5" fill={colors.primary} />
      <circle cx={cx} cy={cy} r="3" fill={colors.accent} />
    </g>
  )
}
