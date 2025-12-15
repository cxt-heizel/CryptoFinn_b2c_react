import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppButton } from '../../../shared/ui/AppButton';
import { AppTextField } from '../../../shared/ui/AppTextField';
import { LoginFormValues, loginSchema } from '../model/loginSchema';
import { useLoginMutation } from '../hooks/useLoginMutation';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutateAsync, isPending, error } = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    await mutateAsync(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <AppTextField
        label="Email"
        type="email"
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register('email')}
      />
      <AppTextField
        label="Password"
        type="password"
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        {...register('password')}
      />
      <Stack spacing={2} sx={{ mt: 2 }}>
        {error ? <Alert severity="error">로그인에 실패했습니다.</Alert> : null}
        <AppButton type="submit" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Login'}
        </AppButton>
      </Stack>
    </Box>
  );
};
