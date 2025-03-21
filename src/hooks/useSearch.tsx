import { useEffect, useRef, useState } from "react"
import { useDebouncedValue, usePrevious } from "@mantine/hooks"

interface useSearchProps {
  page?: number
  setPage?: (p: number) => void
  PAGE_SIZE?: number
}

export default function useSearch({
  page = 1,
  setPage,
  PAGE_SIZE = 10,
}: useSearchProps) {
  const [filteredPayload, setFilteredPayload] = useState<{
    search?: string
    filter?: string | null
    page: number
    PAGE_SIZE: number
  }>({ page, PAGE_SIZE })
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebouncedValue(search.trim(), 500)

  /**
   * Search and page number
   * Set page number to 1 when search
   * then reset page number to previous when search is empty
   */
  const initPage = useRef(page)
  const previous = usePrevious(debouncedSearch)
  useEffect(() => {
    if (!setPage) return
    if (debouncedSearch !== "" && previous !== debouncedSearch) {
      initPage.current = page
      setPage(1)
    }
    if (previous !== "" && debouncedSearch === "") {
      setPage(initPage.current)
    }
  }, [debouncedSearch, previous, setPage, page])

  return {
    filteredPayload,
    setFilteredPayload,
    search,
    setSearch,
    debouncedSearch,
  }
}
