import { useCallback, useState } from "react";

import { openai } from "@/api/openai";

const useApi = () => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (payload: any) => {
    setLoading(true);
    try {
      const result = await openai(payload);
      setData(JSON.parse(result || "{}"));
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

export default useApi;
