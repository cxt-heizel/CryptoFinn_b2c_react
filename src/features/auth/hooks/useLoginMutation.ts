import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hooks';
import { login } from '../api/authApi';
import { setCredentials, setLoading } from '../model/authSlice';
import { LoginPayload } from '../model/types';

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onMutate: () => dispatch(setLoading(true)),
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate('/dashboard');
    },
    onSettled: () => dispatch(setLoading(false)),
  });
};
