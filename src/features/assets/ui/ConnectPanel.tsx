import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ExchangeMeta, PlatformConnectType } from '../model/types';
import {
  useConnectApiMutation,
  useConnectBinanceMutation,
  useConnectFileMutation,
  useConnectWalletMutation,
} from '../hooks/useAssetsMutations';
import { useSnackbar } from '../../../shared/hooks/useSnackbar';
import { AppSnackbar } from '../../../shared/ui/AppSnackbar';

type Props = {
  exchange: ExchangeMeta;
  session?: string;
  onConnected?: () => void;
};

const connectTypeLabel: Record<PlatformConnectType, string> = {
  API: 'API Key 등록',
  EXCEL: '거래소 파일 등록',
  FILE: '거래소 파일 등록',
  TEMPLATE: '유니버셜 템플릿 등록',
  WALLET: '지갑 주소 연결',
  Binance: '바이낸스(복합)',
};

const typeDescription: Partial<Record<PlatformConnectType, string>> = {
  API: '거래소 API Key를 등록하여 자동으로 데이터를 수집합니다.',
  EXCEL: '거래소에서 받은 파일을 업로드해 데이터를 추가합니다.',
  FILE: '거래소에서 받은 파일을 업로드해 데이터를 추가합니다.',
  TEMPLATE: '템플릿을 내려받아 입력 후 업로드하세요.',
  WALLET: '지갑 주소를 등록해 온체인 데이터를 수집합니다.',
  Binance: 'API Key와 거래내역 파일을 함께 등록할 수 있습니다.',
};

export const ConnectPanel = ({ exchange, session, onConnected }: Props) => {
  const initialType =
    exchange.en_name === 'Binance' ? 'Binance' : exchange.type[0] ?? ('API' as PlatformConnectType);
  const [selectedType, setSelectedType] = useState<PlatformConnectType>(initialType);
  const [nickname, setNickname] = useState(exchange.ko_name ?? exchange.en_name);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [address, setAddress] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);

  const apiMutation = useConnectApiMutation(session);
  const binanceMutation = useConnectBinanceMutation(session);
  const fileMutation = useConnectFileMutation(session);
  const walletMutation = useConnectWalletMutation(session);

  const { open, message, severity, showMessage, handleClose } = useSnackbar();

  useEffect(() => {
    const nextType =
      exchange.en_name === 'Binance'
        ? 'Binance'
        : exchange.type[0] ?? ('API' as PlatformConnectType);
    setSelectedType(nextType);
    setNickname(exchange.ko_name ?? exchange.en_name);
    setApiKey('');
    setSecretKey('');
    setAddress('');
    setFiles([]);
    setConsent(false);
  }, [exchange]);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selected);
  };

  const acceptExt = useMemo(() => {
    if (selectedType === 'Binance') return '.zip,.csv';
    if (selectedType === 'EXCEL' || selectedType === 'FILE' || selectedType === 'TEMPLATE')
      return '.xlsx,.csv,.zip';
    return undefined;
  }, [selectedType]);

  const isSubmitting =
    apiMutation.isPending ||
    binanceMutation.isPending ||
    fileMutation.isPending ||
    walletMutation.isPending;

  const isValid = useMemo(() => {
    if (!nickname || !consent) return false;
    if (selectedType === 'WALLET') return Boolean(address);
    if (selectedType === 'API') return Boolean(apiKey && secretKey);
    if (selectedType === 'Binance') return Boolean(apiKey && secretKey);
    if (selectedType === 'EXCEL' || selectedType === 'FILE' || selectedType === 'TEMPLATE') {
      return files.length > 0;
    }
    return true;
  }, [nickname, consent, address, apiKey, secretKey, selectedType, files]);

  const handleSubmit = async () => {
    try {
      if (selectedType === 'API') {
        await apiMutation.mutateAsync({
          seq_exchange: exchange.seq,
          serviceName: exchange.en_name,
          nickname,
          accesskey: apiKey,
          secretkey: secretKey,
        });
        showMessage('API 연결이 완료되었습니다.', 'success');
      } else if (selectedType === 'Binance') {
        await binanceMutation.mutateAsync({
          seq_exchange: exchange.seq,
          nickname,
          accesskey: apiKey,
          secretkey: secretKey,
          files,
        });
        showMessage('바이낸스 연결이 완료되었습니다.', 'success');
      } else if (
        selectedType === 'EXCEL' ||
        selectedType === 'FILE' ||
        selectedType === 'TEMPLATE'
      ) {
        await fileMutation.mutateAsync({
          seq_exchange: exchange.seq,
          serviceName: exchange.en_name,
          nickname,
          upload_type: selectedType,
          api_type: 'PRIVATE',
          seq_user_exchange: '0',
          seq_parent_ue: '0',
          files,
        });
        showMessage('파일 업로드가 완료되었습니다.', 'success');
      } else if (selectedType === 'WALLET') {
        await walletMutation.mutateAsync({
          seq_exchange: exchange.seq,
          nickname,
          address,
        });
        showMessage('지갑이 연결되었습니다.', 'success');
      }
      onConnected?.();
    } catch (error) {
      console.error(error);
      showMessage('연결 중 오류가 발생했습니다.', 'error');
    }
  };

  const typeButtons: PlatformConnectType[] =
    exchange.en_name === 'Binance' ? ['Binance'] : exchange.type.length ? exchange.type : ['API'];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a' }}>
      <Box
        sx={{
          px: 2.5,
          py: 2,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6">{exchange.ko_name ?? exchange.en_name} 연결하기</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            연결 방식을 선택하고 정보를 입력해주세요.
          </Typography>
        </Box>
        <Chip
          label={exchange.category === 'W' ? '지갑' : '거래소'}
          color="default"
          sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: 'white' }}
        />
      </Box>
      <CardContent sx={{ flex: 1, bgcolor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {typeButtons.map((type) => (
              <Chip
                key={type}
                label={connectTypeLabel[type]}
                onClick={() => {
                  setSelectedType(type as PlatformConnectType);
                  setFiles([]);
                }}
                color={selectedType === type ? 'primary' : 'default'}
                variant={selectedType === type ? 'filled' : 'outlined'}
                sx={{ borderRadius: 1.5, fontWeight: 600 }}
              />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {typeDescription[selectedType]}
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <TextField
                  label="닉네임"
                  fullWidth
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {(selectedType === 'API' || selectedType === 'Binance') && (
                  <>
                    <TextField
                      label="API Key"
                      fullWidth
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <TextField
                      label="Secret Key"
                      fullWidth
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </>
                )}
                {selectedType === 'WALLET' && (
                  <TextField
                    label="지갑 주소"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="0x로 시작하는 주소를 입력하세요"
                  />
                )}
                {(selectedType === 'EXCEL' ||
                  selectedType === 'FILE' ||
                  selectedType === 'TEMPLATE' ||
                  selectedType === 'Binance') && (
                  <Stack spacing={1}>
                    <Button variant="outlined" component="label">
                      {files.length ? '파일 다시 선택' : '파일 선택'}
                      <input type="file" hidden multiple onChange={handleFilesChange} accept={acceptExt} />
                    </Button>
                    {files.length > 0 && (
                      <Stack spacing={0.5}>
                        {files.map((file) => (
                          <Typography key={file.name} variant="body2">
                            • {file.name}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                )}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={consent ? '동의 완료' : '개인정보 수집·이용 동의'}
                    color={consent ? 'success' : 'default'}
                    variant={consent ? 'filled' : 'outlined'}
                    onClick={() => setConsent((prev) => !prev)}
                  />
                  <Typography variant="body2" color="text.secondary">
                    버튼을 눌러 동의해주세요.
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? '처리중...' : '연결하기'}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  p: 2,
                  borderRadius: 2,
                  minHeight: 200,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  연결 시 확인하세요
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 정확한 닉네임을 입력하면 거래소를 쉽게 구분할 수 있어요.
                  <br />
                  • API Key는 읽기 전용 권한으로 발급해주세요.
                  <br />
                  • 업로드한 파일은 암호화되어 안전하게 저장됩니다.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
      <AppSnackbar open={open} onClose={handleClose} message={message} severity={severity} />
    </Card>
  );
};
