import { useState } from 'react'
import { Doll } from '../components/Doll.tsx'
import { getItem } from '../data/catalog.ts'
import { outfitScore } from '../lib/outfit.ts'
import { useGame } from '../store.tsx'
import type { Outfit, View } from '../types.ts'

export function Party({ onNavigate }: { onNavigate: (view: View) => void }) {
  const { save, attendParty } = useGame()
  const [story, setStory] = useState<string | null>(null)
  const score = outfitScore(save.equipped)
  const lookName = currentLookName(save.equipped)

  const go = () => {
    const result = attendParty()
    if (result.ok) {
      setStory(partyLine(score, lookName))
    } else {
      setStory(result.message)
    }
  }

  return (
    <section className="screen party">
      <div className="hero-card">
        <p className="kicker">Клуб Aurora</p>
        <h2>Звёздная вечеринка</h2>
        <p className="flavor">
          Огни, музыка и красная дорожка. Надень лучший образ и выйди в свет.
        </p>
        <div className="hero-doll">
          <Doll outfit={save.equipped} size={160} />
        </div>
        <p className="look-name">{lookName}</p>
      </div>

      {story ? <p className="story">{story}</p> : null}

      <div className="party-actions">
        <button type="button" className="primary-btn" onClick={go}>
          Я готова!
        </button>
        <button type="button" className="secondary-btn" onClick={() => onNavigate('wardrobe')}>
          Сменить образ
        </button>
      </div>
    </section>
  )
}

function currentLookName(outfit: Outfit) {
  const dress = getItem(outfit.dress)
  if (dress) return dress.name
  const top = getItem(outfit.top)
  const bottom = getItem(outfit.bottom)
  if (top && bottom) return `${top.name} + ${bottom.name}`
  return 'Свободный стиль'
}

function partyLine(score: number, lookName: string) {
  if (score >= 4) {
    return `Все взгляды на тебя. Образ «${lookName}» стал событием вечера.`
  }
  if (score >= 2) {
    return `Милый выход. «${lookName}» отлично смотрится под огнями клуба.`
  }
  return 'Смело! Иногда меньше — тоже стиль. Завтра можно добавить аксессуар.'
}
