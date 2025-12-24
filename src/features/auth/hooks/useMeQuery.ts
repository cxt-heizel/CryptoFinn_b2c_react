import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/authApi';

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
