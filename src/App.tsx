import { useState } from 'react'
import { Header } from './components/Header.tsx'
import { Nav } from './components/Nav.tsx'
import { Toast } from './components/Toast.tsx'
import { Friends } from './screens/Friends.tsx'
import { Home } from './screens/Home.tsx'
import { Party } from './screens/Party.tsx'
import { Shop } from './screens/Shop.tsx'
import { Wardrobe } from './screens/Wardrobe.tsx'
import { GameProvider } from './store.tsx'
import type { View } from './types.ts'

export default function App() {
  return (
    <GameProvider>
      <StarLook />
    </GameProvider>
  )
}

function StarLook() {
  const [view, setView] = useState<View>('home')

  return (
    <div className="app">
      <Header view={view} />
      <main className="main">
        {view === 'home' ? <Home onNavigate={setView} /> : null}
        {view === 'shop' ? <Shop /> : null}
        {view === 'wardrobe' ? <Wardrobe /> : null}
        {view === 'party' ? <Party onNavigate={setView} /> : null}
        {view === 'friends' ? <Friends /> : null}
      </main>
      <Nav view={view} onChange={setView} />
      <Toast />
    </div>
  )
}
