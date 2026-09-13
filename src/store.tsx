import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CATALOG_BY_ID, START_COINS, STARTER_IDS } from './data/catalog.ts'
import { applyItem, toggleItem } from './lib/outfit.ts'
import type { GameSave, Outfit } from './types.ts'

const SAVE_KEY = 'starlook-save-v1'
const PARTY_COOLDOWN_MS = 8 * 60 * 60 * 1000
const PARTY_REWARD = 40

function defaultSave(): GameSave {
  return {
    coins: START_COINS,
    ownedIds: [...STARTER_IDS],
    equipped: {
      hair: 'hair-waves-gold',
      top: 'top-tank-mint',
      bottom: 'bottom-jeans-indigo',
      shoes: 'shoes-sneakers-cloud',
    },
    partyCount: 0,
    lastPartyAt: null,
  }
}

function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return defaultSave()
    const parsed = JSON.parse(raw) as Partial<GameSave>
    const base = defaultSave()
    return {
      coins: typeof parsed.coins === 'number' ? parsed.coins : base.coins,
      ownedIds: Array.isArray(parsed.ownedIds) ? parsed.ownedIds : base.ownedIds,
      equipped: parsed.equipped ?? base.equipped,
      partyCount: typeof parsed.partyCount === 'number' ? parsed.partyCount : 0,
      lastPartyAt: typeof parsed.lastPartyAt === 'number' ? parsed.lastPartyAt : null,
    }
  } catch {
    return defaultSave()
  }
}

function persist(save: GameSave) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save))
}

export type Toast = { id: number; text: string; kind: 'ok' | 'warn' }

type GameContextValue = {
  save: GameSave
  toast: Toast | null
  ownedSet: Set<string>
  buy: (id: string) => boolean
  equip: (id: string) => void
  isOwned: (id: string) => boolean
  attendParty: () => { ok: boolean; message: string; reward: number }
  reset: () => void
  dismissToast: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<GameSave>(loadSave)
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = useCallback((text: string, kind: Toast['kind'] = 'ok') => {
    setToast({ id: Date.now(), text, kind })
  }, [])

  const commit = useCallback(
    (updater: (prev: GameSave) => GameSave) => {
      setSave((prev) => {
        const next = updater(prev)
        persist(next)
        return next
      })
    },
    [],
  )

  const ownedSet = useMemo(() => new Set(save.ownedIds), [save.ownedIds])

  const buy = useCallback(
    (id: string) => {
      const item = CATALOG_BY_ID[id]
      if (!item) return false
      if (ownedSet.has(id)) {
        showToast('Уже в гардеробе', 'warn')
        return false
      }
      if (save.coins < item.price) {
        showToast('Не хватает монет', 'warn')
        return false
      }
      commit((prev) => ({
        ...prev,
        coins: prev.coins - item.price,
        ownedIds: [...prev.ownedIds, id],
        equipped: applyItem(prev.equipped, item),
      }))
      showToast(`Куплено: ${item.name}`)
      return true
    },
    [commit, ownedSet, save.coins, showToast],
  )

  const equip = useCallback(
    (id: string) => {
      const item = CATALOG_BY_ID[id]
      if (!item || !ownedSet.has(id)) return
      commit((prev) => ({
        ...prev,
        equipped: toggleItem(prev.equipped, item),
      }))
    },
    [commit, ownedSet],
  )

  const isOwned = useCallback((id: string) => ownedSet.has(id), [ownedSet])

  const attendParty = useCallback(() => {
    const now = Date.now()
    if (save.lastPartyAt && now - save.lastPartyAt < PARTY_COOLDOWN_MS) {
      const message = 'Вечеринка уже была. Загляни позже за новым вайбом!'
      showToast(message, 'warn')
      return { ok: false, message, reward: 0 }
    }
    commit((prev) => ({
      ...prev,
      coins: prev.coins + PARTY_REWARD,
      partyCount: prev.partyCount + 1,
      lastPartyAt: now,
    }))
    const message = `Ты сияешь! +${PARTY_REWARD} монет`
    showToast(message)
    return { ok: true, message, reward: PARTY_REWARD }
  }, [commit, save.lastPartyAt, showToast])

  const reset = useCallback(() => {
    const next = defaultSave()
    persist(next)
    setSave(next)
    showToast('Прогресс сброшен', 'warn')
  }, [showToast])

  const dismissToast = useCallback(() => setToast(null), [])

  const value = useMemo<GameContextValue>(
    () => ({
      save,
      toast,
      ownedSet,
      buy,
      equip,
      isOwned,
      attendParty,
      reset,
      dismissToast,
    }),
    [attendParty, buy, dismissToast, equip, isOwned, ownedSet, reset, save, toast],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}

export function previewOutfit(base: Outfit, itemId: string): Outfit {
  const item = CATALOG_BY_ID[itemId]
  if (!item) return base
  return applyItem(base, item)
}
