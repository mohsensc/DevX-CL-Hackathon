import { useSyncExternalStore } from 'react'

export const phoneMediaQuery = '(max-width: 720px)'

function subscribeToPhoneQuery(onChange: () => void) {
  const query = matchMedia(phoneMediaQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function readPhoneQuery() {
  return matchMedia(phoneMediaQuery).matches
}

export function useIsPhone() {
  return useSyncExternalStore(subscribeToPhoneQuery, readPhoneQuery, () => false)
}
