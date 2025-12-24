import { Typography,Container, Box, Paper, Stack } from '@mui/material';
import { LoginForm } from '../../features/auth/ui/LoginForm';
import { AppButton } from '../../shared/ui/AppButton';
import { Provider, useState } from 'react';


export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  
  const handleLoginClick = (provider: Provider) => {
    if (isLoading) return; // 중복 클릭 방지
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      location.href = '/dashboard';
    }, 1000);
  };

  return (
    <Box sx={{ bgcolor: 'background.grey', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',  flex: 1, minHeight: 0}}>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap: 20, pt:20,pb: 40}}>
          <Box
            component="img"
            src="https://www.cryptofinn.io/assets/images/logo/ctf_tax_v.svg"
          />
          <Paper sx={{ maxWidth: 344, bgcolor: 'background.default', width: '100%', p: 16 }}>
            <Stack sx={{gap: 10}}>
              <AppButton loading={isLoading} onClick={() => handleLoginClick('kakao')} sx={{bgcolor:'#fde13c', fontWeight: 500}} size='medium'>카카오 로그인</AppButton>
              <AppButton loading={isLoading} onClick={() => handleLoginClick('naver')} variant="outlined" size='medium'>네이버 로그인</AppButton>
              <AppButton loading={isLoading} onClick={() => handleLoginClick('google')} variant="outlined" size='medium'>구글 로그인</AppButton>
              <AppButton loading={isLoading} onClick={() => handleLoginClick('apple')} variant="outlined" size='medium'>애플 로그인</AppButton>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

