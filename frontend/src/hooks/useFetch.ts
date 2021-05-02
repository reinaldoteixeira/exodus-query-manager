import useSWR from 'swr';
import api from '../services/api';

export default function useFetch<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(url, async (url) => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error };
}
