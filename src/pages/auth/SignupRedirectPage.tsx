import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SignupRedirectPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.grey',
        p: 4,
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ maxWidth: 420, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700}>
          추가 인증이 필요합니다
        </Typography>
        <Typography variant="body1">
          서비스 이용을 위해 NICE 본인인증을 완료해주세요. 이미 인증을 완료했다면 새로고침하거나 다시 로그인하세요.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          로그인 페이지로 이동
        </Button>
      </Stack>
    </Box>
  );
};
