import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (codespaceName && !/^[a-z0-9-]+$/i.test(codespaceName)) {
  throw new Error('VITE_CODESPACE_NAME must contain only letters, numbers, and hyphens.')
}

const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_ENDPOINTS = {
  activities: `${apiOrigin}/api/activities/`,
  leaderboard: `${apiOrigin}/api/leaderboard/`,
  teams: `${apiOrigin}/api/teams/`,
  users: `${apiOrigin}/api/users/`,
  workouts: `${apiOrigin}/api/workouts/`,
}

export function useApiCollection(endpoint) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        const collection = Array.isArray(payload) ? payload : payload?.results
        if (!Array.isArray(collection)) {
          throw new Error('The API response must be an array or contain a results array.')
        }

        setData(collection)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return { data, loading, error }
}

export function getDisplayName(value) {
  if (typeof value === 'string') return value
  return value?.displayName || value?.name || value?.username || '—'
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}
