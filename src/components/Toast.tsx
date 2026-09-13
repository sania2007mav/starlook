import { useEffect } from 'react'
import { useGame } from '../store.tsx'

export function Toast() {
  const { toast, dismissToast } = useGame()

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(dismissToast, 2200)
    return () => window.clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

  return (
    <div className={`toast ${toast.kind}`} role="status">
      {toast.text}
    </div>
  )
}
