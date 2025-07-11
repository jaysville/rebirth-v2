import { useState } from "react";
import serverUrl from "@/utils/server";
import { notifyError } from "..";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useHttp = (
  url: string,
  method: string,
  body?: any,
  isFormData: boolean = false
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = useSelector((state: RootState) => state.app.token);

  const fetchData = async () => {
    setLoading(true);

    let headers: Record<string, string> = {};
    let requestBody: any;

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (isFormData) {
      const formData = new FormData();
      if (body?.name) formData.append("name", body.name);
      if (body?.category) formData.append("category", body.category);
      if (body?.price) formData.append("price", body.price.toString());
      formData.append("soldout", body.soldout);
      if (body?.sizes)
        formData.append(
          "sizes",
          Array.isArray(body.sizes) ? body.sizes.join(" ") : body.sizes
        );

      if (body?.images?.length) {
        for (let i = 0; i < body.images.length; i++) {
          formData.append("images", body.images[i]);
        }
      }
      console.log(body);
      requestBody = formData;
    } else {
      headers["Content-Type"] = "application/json";
      requestBody = body ? JSON.stringify(body) : null;
    }

    try {
      const response = await fetch(`${serverUrl}/${url}`, {
        method,
        headers,
        body: requestBody,
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
      setIsError(true);
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
