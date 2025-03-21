import { useEffect, useState } from "react"
import useQueryParams from "./useQueryParams"

export default function usePage(): [number, (p: number) => void] {
  const [queryParams, setQueryParams] = useQueryParams()

  const currentPage = queryParams["page"]
  const [page, setpage] = useState(currentPage ? Number(currentPage) : 1)

  const setPage = (p: number) => {
    setpage(p)
    setQueryParams({ page: `${p}` })
  }

  useEffect(() => {
    setpage(Number(currentPage) || 1)
  }, [currentPage])

  return [page, setPage]
}
