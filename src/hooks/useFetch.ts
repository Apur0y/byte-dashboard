import { useEffect, useState } from "react"

interface FetchState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    let isMounted = true
    setState({ data: null, error: null, loading: true })

    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        const data = (await res.json()) as T
        if (isMounted) setState({ data, error: null, loading: false })
      })
      .catch((err: Error) => {
        if (isMounted) setState({ data: null, error: err.message, loading: false })
      })

    return () => {
      isMounted = false
    }
  }, [url, options])

  return state
}
