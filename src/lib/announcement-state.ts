// Tiny shared state for announcement bar visibility
// Uses useSyncExternalStore pattern — no dependencies needed

let visible = true
const listeners = new Set<() => void>()

export function getAnnouncementVisible(): boolean {
  return visible
}

export function setAnnouncementVisible(v: boolean): void {
  visible = v
  listeners.forEach((l) => l())
}

export function subscribeAnnouncement(callback: () => void): () => void {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}
