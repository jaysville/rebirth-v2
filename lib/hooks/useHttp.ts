import { useState, useEffect } from "react";
import serverUrl from "@/utils/server";
import { notifyError } from "..";

const useHttp = (url: string, method: string, body?: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      const result = await response.json();

      if (!response.ok) {
        setIsError(true);
        throw new Error(result?.message || "Request failed");
      }

      setIsSuccess(true);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      notifyError(err?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error, isError, isSuccess };
};

export default useHttp;
