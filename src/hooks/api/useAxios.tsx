import { useState, useEffect } from 'react';

// https://youtu.be/NqdqnfzOQFE
function useAxios(configObj: any) {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const refetch = () => setReload((prev) => !prev);

  useEffect(() => {
    const controller = new AbortController(); // escape memory leak
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        setResponse(res.data);
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // cleanup: component unmount 시 request cancel
    // -> escape memory leak
    return () => controller.abort();
    // eslint-disable-next-line
  }, [reload]);

  return [response, error, loading, refetch];
}

export default useAxios;
