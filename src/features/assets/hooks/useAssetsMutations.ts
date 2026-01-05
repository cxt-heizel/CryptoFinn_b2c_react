import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ASSETS_QUERY_KEYS,
} from './useAssetsQueries';
import {
  ConnectApiPayload,
  ConnectBinancePayload,
  ConnectFilePayload,
  ConnectWalletPayload,
  DeleteExchangePayload,
  UpdateApiKeyPayload,
  UpdateFilePayload,
  UpdateNicknamePayload,
  connectApi,
  connectBinance,
  connectFile,
  connectWallet,
  deleteExchange,
  updateApiKey,
  updateFile,
  updateNickname,
} from '../api/assetsApi';

const invalidateAssetsQueries = (queryClient: ReturnType<typeof useQueryClient>, session?: string) => {
  const sessionKey = session ?? '';
  void queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.userExchanges(sessionKey) });
  void queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.allExchanges(sessionKey) });
  void queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.crawler(sessionKey) });
};

export const useConnectApiMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConnectApiPayload) => connectApi({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useConnectBinanceMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConnectBinancePayload) => connectBinance({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useConnectFileMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConnectFilePayload) => connectFile({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useConnectWalletMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConnectWalletPayload) => connectWallet({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useUpdateApiKeyMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateApiKeyPayload) => updateApiKey({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useUpdateFileMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateFilePayload) => updateFile({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useUpdateNicknameMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateNicknamePayload) => updateNickname({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};

export const useDeleteExchangeMutation = (session?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DeleteExchangePayload) => deleteExchange({ ...payload, session }),
    onSuccess: () => invalidateAssetsQueries(queryClient, session),
  });
};
