export type Category = 'hair' | 'top' | 'bottom' | 'dress' | 'shoes' | 'accessory'

export type View = 'home' | 'shop' | 'wardrobe' | 'party' | 'friends'

export type Palette = {
  primary: string
  secondary: string
  accent: string
}

export type Outfit = {
  hair?: string
  top?: string
  bottom?: string
  dress?: string
  shoes?: string
  accessory?: string
}

export type ClothingItem = {
  id: string
  name: string
  category: Category
  price: number
  variant: string
  colors: Palette
}

export type Friend = {
  id: string
  name: string
  bio: string
  mood: string
  outfit: Outfit
}

export type GameSave = {
  coins: number
  ownedIds: string[]
  equipped: Outfit
  partyCount: number
  lastPartyAt: number | null
}
