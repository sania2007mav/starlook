import type { Friend } from '../types.ts'

export const FRIENDS: Friend[] = [
  {
    id: 'lisa',
    name: 'Лиза',
    bio: 'Любит вечерний шик и красную дорожку.',
    mood: 'Готова к премьере',
    outfit: {
      hair: 'hair-bob-ink',
      dress: 'dress-evening-night',
      shoes: 'shoes-heels-red',
      accessory: 'acc-necklace-pearl',
    },
  },
  {
    id: 'mia',
    name: 'Мия',
    bio: 'Казуал, пастель и прогулки по городу.',
    mood: 'Идёт за смузи',
    outfit: {
      hair: 'hair-pony-pink',
      top: 'top-crop-rose',
      bottom: 'bottom-shorts-coral',
      shoes: 'shoes-sneakers-cloud',
      accessory: 'acc-bows-pink',
    },
  },
  {
    id: 'sonya',
    name: 'Соня',
    bio: 'Принцесса вечеринок и королева блёсток.',
    mood: 'Уже на танцполе',
    outfit: {
      hair: 'hair-curls-cocoa',
      dress: 'dress-ball-royal',
      shoes: 'shoes-sandals-gold',
      accessory: 'acc-crown-royal',
    },
  },
]
