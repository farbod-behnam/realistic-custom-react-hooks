import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxiosGet<T>(url: string) {

  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });

        if (isMounted) {
          setData(response.data);
          setError(undefined);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          }
          else {
            const error = err as Error;
            setError(error.message || 'Something went wrong!');
            setIsLoading(false);
          }
          setData(undefined);
        }
      } finally {
        isMounted = false;
        setIsLoading(false);
      }
    }

    fetchData(url);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;
  }, [url]);

  return [data, error, isLoading] as const;
}

// export default function useAxios<T>() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | undefined>(undefined);
//   const [data, setData] = useState<T | undefined>(undefined);

//   const sendRequest = async (params: AxiosRequestConfig<any>) => {
//     setIsLoading(true);
//     setError(undefined);

//     try {
//       let loadedData: T;

//       let response = await axios.request(params);

//       if (response.status !== 200)
//         throw new Error("data cannot be received");

//       loadedData = response.data;

//       setData(loadedData);

//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.message);
//       }
//       else {
//         const error = err as Error;
//         setError(error.message || 'Something went wrong!');
//         setIsLoading(false);
//       }
//     }
//     setIsLoading(false);

//   };



//   return [data, error, isLoading, sendRequest] as const;
// }