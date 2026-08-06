import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const subscribe = React.useCallback((callback: () => void) => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    query.addEventListener("change", callback)
    return () => query.removeEventListener("change", callback)
  }, [])

  const getSnapshot = React.useCallback(
    () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
    []
  )

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
