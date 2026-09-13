import { useState } from 'react'
import { Doll } from '../components/Doll.tsx'
import { FRIENDS } from '../data/friends.ts'
import { getItem } from '../data/catalog.ts'
import type { ClothingItem } from '../types.ts'

export function Friends() {
  const [friendId, setFriendId] = useState(FRIENDS[0].id)
  const friend = FRIENDS.find((item) => item.id === friendId) ?? FRIENDS[0]
  const pieces = [
    getItem(friend.outfit.hair),
    getItem(friend.outfit.dress),
    getItem(friend.outfit.top),
    getItem(friend.outfit.bottom),
    getItem(friend.outfit.shoes),
    getItem(friend.outfit.accessory),
  ].filter((item): item is ClothingItem => item !== undefined)

  return (
    <section className="screen friends">
      <p className="flavor">Локальные подруги для MVP — их образы уже собраны.</p>
      <div className="friend-list">
        {FRIENDS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === friendId ? 'friend-chip active' : 'friend-chip'}
            onClick={() => setFriendId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="hero-card">
        <p className="kicker">{friend.mood}</p>
        <h2>{friend.name}</h2>
        <p className="flavor">{friend.bio}</p>
        <div className="hero-doll">
          <Doll outfit={friend.outfit} size={160} />
        </div>
        <ul className="look-bits">
          {pieces.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
