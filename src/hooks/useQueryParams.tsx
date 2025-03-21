import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [queryParam, setQueryParam] = useState<Record<string, string>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...Object.fromEntries([...prev]),
      ...queryParam,
    }));
  }, [setSearchParams, queryParam]);

  return [queryParams, setQueryParam] as const;
}
