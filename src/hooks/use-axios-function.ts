import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function useAxiosFunction<T>() {

    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController>();

    const axiosSendRequest = async (config: AxiosRequestConfig<T>) => {
        const ctrl = new AbortController();
        setController(ctrl);

        try {
            setIsLoading(true);

            const response = await axios.request({
                ...config,
                signal: ctrl.signal
            });

            setData(response.data);
            setError(undefined);

        } catch (err) {
            console.log(err);
            if (axios.isAxiosError(err)) {
                setError(err.message);
            }
            else {
                const error = err as Error;
                setError(error.message || 'Something went wrong!');
            }

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        return () => {
            // if (controller)
            controller && controller.abort();
        }

    }, [controller]);

    return [data, error, isLoading, axiosSendRequest] as const;
}