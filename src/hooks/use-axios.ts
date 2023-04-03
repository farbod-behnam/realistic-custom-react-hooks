import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function useAxios<T>(config: AxiosRequestConfig<any>) {

    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(false);

    const refetch = () => {
        setReload((prevState) => !prevState);
        setIsLoading(true);
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const sendRequest = async () => {
            try {

                const response = await axios.request({
                    ...config,
                    signal: controller.signal
                });


                if (isMounted) {
                    console.log(response);
                    setData(response.data);
                    setError(undefined);
                }

            } catch (err) {
                if (isMounted) {
                    console.log(err);
                    if (axios.isAxiosError(err)) {
                        setError(err.message);
                    }
                    else {
                        const error = err as Error;
                        setError(error.message || 'Something went wrong!');
                        setIsLoading(false);
                    }
                }

            } finally {
                isMounted && setIsLoading(false);
            }
        }

        sendRequest();

        return () => {
            isMounted = false;
            controller.abort();
        }


    }, [reload]);

    return [data, error, isLoading, refetch] as const;
}