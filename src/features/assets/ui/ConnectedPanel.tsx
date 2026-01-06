import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  ExchangeMeta,
  PlatformStatus,
  SubAccount,
  UserExchange,
  formatUpdatedAt,
  statusBadges,
} from '../model/types';
import {
  useConnectApiMutation,
  useConnectFileMutation,
  useDeleteExchangeMutation,
  useUpdateApiKeyMutation,
  useUpdateFileMutation,
  useUpdateNicknameMutation,
} from '../hooks/useAssetsMutations';
import { useSnackbar } from '../../../shared/hooks/useSnackbar';
import { AppSnackbar } from '../../../shared/ui/AppSnackbar';
import { AppDialog } from '../../../shared/ui/AppDialog';

type DialogType =
  | null
  | 'rename'
  | 'api'
  | 'file'
  | 'delete'
  | 'add-sub-api'
  | 'add-sub-file'
  | 'sub-api'
  | 'sub-file'
  | 'sub-delete';

type DialogState = {
  type: DialogType;
  target?: SubAccount | null;
};

type Props = {
  exchange: UserExchange;
  status?: PlatformStatus;
  allExchanges?: ExchangeMeta[];
  session?: string;
  onUpdated?: () => void;
  onClose?: () => void;
};

const truncate = (text?: string) => {
  if (!text) return '';
  if (text.length <= 12) return text;
  return `${text.slice(0, 4)}...${text.slice(-4)}`;
};

export const ConnectedPanel = ({
  exchange,
  status,
  allExchanges,
  session,
  onUpdated,
  onClose,
}: Props) => {
  const [dialog, setDialog] = useState<DialogState>({ type: null });
  const [nameInput, setNameInput] = useState(exchange.nickname);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [subName, setSubName] = useState('');

  const { open, message, severity, showMessage, handleClose } = useSnackbar();

  const meta = useMemo(
    () => allExchanges?.find((item) => String(item.seq) === String(exchange.seq)),
    [allExchanges, exchange.seq],
  );

  const supportsApi = exchange.type === 'API' || exchange.en_name === 'Binance';
  const supportsFile =
    ['EXCEL', 'FILE', 'TEMPLATE'].includes(String(exchange.type)) || exchange.en_name === 'Binance';
  const uploadType = exchange.type === 'TEMPLATE' ? 'TEMPLATE' : 'FILE';
  const fileAccept = exchange.en_name === 'Binance' ? '.csv,.zip' : '.xlsx,.csv,.zip';

  const supportsSubAccount = Boolean(meta?.isSupportsSub || exchange.sub_accounts?.length);
  const subUploadType = meta?.type?.includes('TEMPLATE') ? 'TEMPLATE' : 'FILE';
  const subAccept = exchange.en_name === 'Binance' ? '.csv,.zip' : '.xlsx,.csv';

  const apiMutation = useUpdateApiKeyMutation(session);
  const fileMutation = useUpdateFileMutation(session);
  const nameMutation = useUpdateNicknameMutation(session);
  const deleteMutation = useDeleteExchangeMutation(session);
  const addSubApiMutation = useConnectApiMutation(session);
  const addSubFileMutation = useConnectFileMutation(session);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selected);
  };

  const closeDialog = () => setDialog({ type: null, target: null });

  const handleSuccess = (msg: string) => {
    closeDialog();
    showMessage(msg, 'success');
    onUpdated?.();
  };

  const handleError = (msg: string) => {
    showMessage(msg, 'error');
  };

  const handleUpdateApiKey = async () => {
    try {
      await apiMutation.mutateAsync({
        serviceName: exchange.en_name,
        seq_user_exchange: exchange.seq_user_exchange,
        accesskey: apiKey,
        secretkey: secretKey,
      });
      handleSuccess('API Key가 변경되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('API Key 변경에 실패했습니다.');
    }
  };

  const handleUpdateFiles = async () => {
    try {
      await fileMutation.mutateAsync({
        serviceName: exchange.en_name,
        seq_exchange: exchange.seq,
        nickname: exchange.nickname,
        upload_type: uploadType,
        api_type: exchange.account_type ?? 'PRIVATE',
        seq_user_exchange: exchange.seq_user_exchange,
        seq_parent_ue: '0',
        files,
      });
      handleSuccess('거래 데이터가 추가되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('거래 데이터 추가에 실패했습니다.');
    }
  };

  const handleRename = async () => {
    try {
      await nameMutation.mutateAsync({
        seq_user_exchange: exchange.seq_user_exchange,
        nickname: nameInput,
      });
      handleSuccess('닉네임이 변경되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('닉네임 변경에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        serviceName: exchange.en_name,
        seq_user_exchange: exchange.seq_user_exchange,
        address: exchange.address,
      });
      handleSuccess('연결이 삭제되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('삭제에 실패했습니다.');
    }
  };

  const handleAddSubApi = async () => {
    try {
      await addSubApiMutation.mutateAsync({
        seq_exchange: exchange.seq,
        serviceName: exchange.en_name,
        nickname: subName,
        accesskey: apiKey,
        secretkey: secretKey,
        api_type: 'PRIVATE_SUB',
        seq_parent_ue: exchange.seq_user_exchange,
      });
      handleSuccess('Sub Account가 추가되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('Sub Account 추가에 실패했습니다.');
    }
  };

  const handleAddSubFile = async () => {
    try {
      await addSubFileMutation.mutateAsync({
        seq_exchange: exchange.seq,
        serviceName: exchange.en_name,
        nickname: subName,
        upload_type: subUploadType,
        api_type: 'PRIVATE_SUB',
        seq_user_exchange: '0',
        seq_parent_ue: exchange.seq_user_exchange,
        files,
      });
      handleSuccess('Sub Account 데이터가 추가되었습니다.');
    } catch (error) {
      console.error(error);
      handleError('Sub Account 파일 업로드에 실패했습니다.');
    }
  };

  const renderDialog = () => {
    if (!dialog.type) return null;

    const isSub = dialog.target;
    const submitDisabled =
      dialog.type === 'rename'
        ? !nameInput
        : dialog.type === 'api' || dialog.type === 'add-sub-api' || dialog.type === 'sub-api'
          ? !apiKey || !secretKey
          : dialog.type === 'file' ||
              dialog.type === 'add-sub-file' ||
              dialog.type === 'sub-file'
            ? files.length === 0
            : false;

    const commonActions = (
      <>
        <Button onClick={closeDialog}>취소</Button>
        {dialog.type === 'rename' && (
          <Button variant="contained" onClick={handleRename} disabled={submitDisabled}>
            변경하기
          </Button>
        )}
        {dialog.type === 'api' && (
          <Button variant="contained" onClick={handleUpdateApiKey} disabled={submitDisabled}>
            저장
          </Button>
        )}
        {dialog.type === 'file' && (
          <Button variant="contained" onClick={handleUpdateFiles} disabled={submitDisabled}>
            업로드
          </Button>
        )}
        {dialog.type === 'delete' && (
          <Button variant="contained" color="error" onClick={handleDelete}>
            삭제하기
          </Button>
        )}
        {dialog.type === 'add-sub-api' && (
          <Button variant="contained" onClick={handleAddSubApi} disabled={submitDisabled}>
            Sub Account 추가
          </Button>
        )}
        {dialog.type === 'add-sub-file' && (
          <Button variant="contained" onClick={handleAddSubFile} disabled={submitDisabled}>
            파일 추가
          </Button>
        )}
        {dialog.type === 'sub-api' && isSub && (
          <Button
            variant="contained"
            onClick={async () => {
              try {
                await apiMutation.mutateAsync({
                  serviceName: exchange.en_name,
                  seq_user_exchange: isSub.seq_user_exchange,
                  accesskey: apiKey,
                  secretkey: secretKey,
                });
                handleSuccess('Sub Account API Key 변경 완료');
              } catch (error) {
                console.error(error);
                handleError('Sub Account API 변경 실패');
              }
            }}
            disabled={submitDisabled}
          >
            저장
          </Button>
        )}
        {dialog.type === 'sub-file' && isSub && (
          <Button
            variant="contained"
            onClick={async () => {
              try {
                await fileMutation.mutateAsync({
                  serviceName: exchange.en_name,
                  seq_exchange: exchange.seq,
                  nickname: isSub.nickname,
                  upload_type: subUploadType,
                  api_type: 'PRIVATE_SUB',
                  seq_user_exchange: isSub.seq_user_exchange,
                  seq_parent_ue: exchange.seq_user_exchange,
                  files,
                });
                handleSuccess('Sub Account 파일 추가 완료');
              } catch (error) {
                console.error(error);
                handleError('Sub Account 파일 추가 실패');
              }
            }}
            disabled={submitDisabled}
          >
            업로드
          </Button>
        )}
        {dialog.type === 'sub-delete' && isSub && (
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                await deleteMutation.mutateAsync({
                  serviceName: exchange.en_name,
                  seq_user_exchange: isSub.seq_user_exchange,
                });
                handleSuccess('Sub Account가 삭제되었습니다.');
              } catch (error) {
                console.error(error);
                handleError('Sub Account 삭제 실패');
              }
            }}
          >
            삭제하기
          </Button>
        )}
      </>
    );

    const titleMap: Record<NonNullable<DialogType>, string> = {
      rename: '닉네임 변경',
      api: 'API Key 변경',
      file: '거래 데이터 추가',
      delete: '삭제 확인',
      'add-sub-api': 'Sub Account 추가 (API)',
      'add-sub-file': 'Sub Account 추가 (파일)',
      'sub-api': 'Sub Account API 변경',
      'sub-file': 'Sub Account 파일 추가',
      'sub-delete': 'Sub Account 삭제',
    };

    return (
      <AppDialog
        open
        onClose={closeDialog}
        title={dialog.type ? titleMap[dialog.type] : ''}
        actions={commonActions}
        maxWidth="sm"
        fullWidth
      >
        <Stack spacing={2} sx={{ mt: 1 }}>
          {(dialog.type === 'rename' || dialog.type?.startsWith('add-sub') || dialog.type === 'sub-api') && (
            <TextField
              label={dialog.type?.startsWith('add-sub') ? 'Sub Account 닉네임' : '닉네임'}
              value={dialog.type?.startsWith('add-sub') ? subName : nameInput}
              onChange={(e) =>
                dialog.type?.startsWith('add-sub') ? setSubName(e.target.value) : setNameInput(e.target.value)
              }
              fullWidth
            />
          )}
          {(dialog.type === 'api' ||
            dialog.type === 'add-sub-api' ||
            dialog.type === 'sub-api') && (
            <>
              <TextField
                label="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                fullWidth
              />
              <TextField
                label="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                fullWidth
              />
            </>
          )}
          {(dialog.type === 'file' ||
            dialog.type === 'add-sub-file' ||
            dialog.type === 'sub-file') && (
            <Stack spacing={1}>
              <Button variant="outlined" component="label">
                파일 선택
                <input
                  type="file"
                  hidden
                  multiple
                  accept={dialog.type.startsWith('add-sub') || dialog.type.startsWith('sub') ? subAccept : fileAccept}
                  onChange={handleFilesChange}
                />
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
          {dialog.type === 'delete' || dialog.type === 'sub-delete' ? (
            <Typography color="text.secondary">
              연결된 데이터가 모두 삭제됩니다. 계속 진행하시겠어요?
            </Typography>
          ) : null}
        </Stack>
      </AppDialog>
    );
  };

  const statusBadge = status ? statusBadges[status] : null;

  return (
    <Card sx={{ height: '100%', p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
        <Avatar
          variant="rounded"
          src={exchange.logo}
          sx={{ width: 48, height: 48, bgcolor: '#EEF2FF' }}
        >
          {exchange.nickname.slice(0, 1)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{exchange.nickname}</Typography>
          <Typography variant="body2" color="text.secondary">
            {exchange.en_name} · {formatUpdatedAt(exchange.updated_at) ?? '업데이트 없음'}
          </Typography>
        </Box>
        {statusBadge ? (
          <Chip label={statusBadge.label} color={statusBadge.color} variant="outlined" />
        ) : null}
        <IconButton size="small" onClick={onClose} aria-label="닫기">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">연결 정보</Typography>
            <Box
              sx={{
                bgcolor: '#f8fafc',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                label={exchange.type === 'WALLET' ? '지갑 주소' : String(exchange.type)}
                color="primary"
                variant="outlined"
              />
              {exchange.type === 'API' && <Typography>{truncate(exchange.api_key)}</Typography>}
              {exchange.type === 'WALLET' && <Typography>{truncate(exchange.address)}</Typography>}
              {exchange.file_list?.length
                ? exchange.file_list.map((file) => (
                    <Chip key={file.file_name} label={file.file_name} variant="outlined" />
                  ))
                : null}
            </Box>
            {supportsSubAccount && (
              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Sub Account</Typography>
                  <Stack direction="row" spacing={1}>
                    {meta?.type?.includes('API') && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setSubName('');
                          setApiKey('');
                          setSecretKey('');
                          setDialog({ type: 'add-sub-api' });
                        }}
                      >
                        Sub Account(API)
                      </Button>
                    )}
                    {meta?.type?.some((t) => ['EXCEL', 'FILE', 'TEMPLATE'].includes(t)) && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setSubName('');
                          setFiles([]);
                          setDialog({ type: 'add-sub-file' });
                        }}
                      >
                        Sub Account(파일)
                      </Button>
                    )}
                  </Stack>
                </Stack>
                {exchange.sub_accounts && exchange.sub_accounts.length > 0 ? (
                  <Stack spacing={1}>
                    {exchange.sub_accounts.map((sub) => (
                      <Box
                        key={sub.seq_user_exchange}
                        sx={{
                          border: '1px solid #e2e8f0',
                          borderRadius: 1.5,
                          p: 1,
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography fontWeight={600}>{sub.nickname}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {sub.api_key ? truncate(sub.api_key) : sub.file_list?.[0]?.file_name ?? '데이터 없음'}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          {sub.api_key ? (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setApiKey(sub.api_key ?? '');
                                setSecretKey('');
                                setDialog({ type: 'sub-api', target: sub });
                              }}
                            >
                              API 변경
                            </Button>
                          ) : null}
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setFiles([]);
                              setDialog({ type: 'sub-file', target: sub });
                            }}
                          >
                            파일 추가
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => setDialog({ type: 'sub-delete', target: sub })}
                          >
                            삭제
                          </Button>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    연결된 Sub Account가 없습니다.
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            {supportsApi && (
              <Button variant="outlined" onClick={() => setDialog({ type: 'api' })}>
                API Key 변경
              </Button>
            )}
            {supportsFile && (
              <Button variant="outlined" onClick={() => setDialog({ type: 'file' })}>
                거래 데이터 추가
              </Button>
            )}
            <Button variant="outlined" onClick={() => setDialog({ type: 'rename' })}>
              닉네임 변경
            </Button>
            <Divider />
            <Button variant="contained" color="error" onClick={() => setDialog({ type: 'delete' })}>
              삭제
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {renderDialog()}
      <AppSnackbar open={open} onClose={handleClose} message={message} severity={severity} />
    </Card>
  );
};
