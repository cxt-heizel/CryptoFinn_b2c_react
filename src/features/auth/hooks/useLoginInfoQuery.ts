import { useQuery } from '@tanstack/react-query';
import { AUTH_LOGIN_INFO_QUERY_KEY } from '../../../shared/constants/queryKeys';
import { fetchLoginInfo } from '../api/authApi';
import { LoginInfoResponse } from '../model/types';

export const useLoginInfoQuery = (enabled = true) => {
  return useQuery<LoginInfoResponse>({
    queryKey: AUTH_LOGIN_INFO_QUERY_KEY,
    queryFn: fetchLoginInfo,
    enabled,
    staleTime: 60 * 1000,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
