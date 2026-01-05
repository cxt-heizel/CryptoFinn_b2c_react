import { useQuery } from '@tanstack/react-query';
import { fetchAllExchanges, fetchCrawlerState, fetchUserExchanges } from '../api/assetsApi';
import {
  AllExchangesResponse,
  CrawlerStateResponse,
  UserExchangesResponse,
} from '../model/types';

export const ASSETS_QUERY_KEYS = {
  allExchanges: (session: string) => ['assets', 'all-exchanges', session] as const,
  userExchanges: (session: string) => ['assets', 'user-exchanges', session] as const,
  crawler: (session: string) => ['assets', 'crawler', session] as const,
};

type Options = {
  enabled?: boolean;
  headers?: Record<string, string>;
};

type CrawlerOptions = Options & {
  refetchInterval?: number;
};

export const useAllExchangesQuery = (session?: string, options: Options = {}) => {
  const { enabled = true, headers } = options;
  const key = ASSETS_QUERY_KEYS.allExchanges(session ?? '');
  return useQuery<AllExchangesResponse>({
    queryKey: key,
    queryFn: () => fetchAllExchanges(session, headers),
    enabled: enabled && Boolean(session),
    staleTime: 30 * 1000,
  });
};

export const useUserExchangesQuery = (session?: string, options: Options = {}) => {
  const { enabled = true, headers } = options;
  const key = ASSETS_QUERY_KEYS.userExchanges(session ?? '');
  return useQuery<UserExchangesResponse>({
    queryKey: key,
    queryFn: () => fetchUserExchanges(session, headers),
    enabled: enabled && Boolean(session),
    staleTime: 10 * 1000,
  });
};

export const useCrawlerStateQuery = (session?: string, options: CrawlerOptions = {}) => {
  const { enabled = true, headers, refetchInterval = 5000 } = options;
  const key = ASSETS_QUERY_KEYS.crawler(session ?? '');
  return useQuery<CrawlerStateResponse>({
    queryKey: key,
    queryFn: () => fetchCrawlerState(session, headers),
    enabled: enabled && Boolean(session),
    refetchInterval,
    refetchIntervalInBackground: true,
  });
};
