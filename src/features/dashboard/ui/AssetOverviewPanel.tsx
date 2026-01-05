import { Box, Divider, Grid, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { AppDatePicker } from '../../../shared/ui/AppDatePicker';
import { AppDropdownMenuButton } from '../../../shared/ui/AppDropdownMenuButton';
import { TextBlock } from '../../../shared/ui/TextBlock';
import { AppButton } from '../../../shared/ui/AppButton';
import { DashboardCharts } from './DashboardCharts';
import { DashboardStat } from '../model/types';
import { SummaryStat } from '../model/dashboardData';
import { SectionTitle } from './SectionTitle';
import styled from '@emotion/styled';

type Props = {
  stats: DashboardStat[];
  summaryStats: SummaryStat[];
  onDownload: (format: string) => void;
  yearLabel?: string;
  assetCount?: number;
  isLoading?: boolean;
};

export const AssetOverviewPanel = ({
  stats,
  summaryStats,
  onDownload,
  yearLabel = '2024년',
  assetCount = 11,
  isLoading,
}: Props) => {
  return (
    <Box>
      <SectionTitle>
        <Box>
          <Typography variant="h3" color="var(--Color-greyscale-1000)">
            보유자산
          </Typography>
        </Box>
      </SectionTitle>
      <Divider />
      <AssetToolBar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AppDatePicker />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--Color-greyscale-800)' }}>
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
              {/* {updatedLabel} */}
            </Typography>
            <SyncRoundedIcon fontSize="inherit" />
          </Box>
          <Box>
            <AppDropdownMenuButton
              defaultLabel="다운로드"
              options={[
                { label: 'PDF', value: 'PDF' },
                { label: 'XLS', value: 'XLS' },
              ]}
              onSelect={(option) => onDownload(option.value)}
            />
          </Box>
        </Box>
      </AssetToolBar>
      <Divider />
      <DayAssetsCharts>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <TextBlock title="151,043,961원" desc="전체 보유자산" size="lg" titleFirst={false} />
          <FormGroup>
            <FormControlLabel control={<Switch size="small"/>} label="소액자산 숨기기" />
          </FormGroup>
        </Box>
        <Divider />
        <DashboardCharts stats={stats} loading={isLoading} />
      </DayAssetsCharts>
      <Divider />
      <Box sx={{ bgcolor: 'var(--Color-greyscale-000)' }}>
        <SectionTitle>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="h3" color="var(--Color-greyscale-1000)">
              {yearLabel}
            </Typography>
            <AppButton size="small" variant="outlined" sx={{ minWidth: 'unset', p: '1px' }}>
              <ChevronLeftRoundedIcon fontSize="small" />
            </AppButton>
            <AppButton size="small" variant="outlined" sx={{ minWidth: 'unset', p: '1px' }}>
              <ChevronRightRoundedIcon fontSize="small" />
            </AppButton>
          </Box>
        </SectionTitle>
        <Divider />
        <Grid container spacing={1.5} sx={{ py: 3, px: 4 }}>
          {summaryStats.map(({ title, desc }, idx) => (
            <Grid key={desc} size={{ xs: 12, md: 4 }} sx={{ position: 'relative' }}>
              {idx < summaryStats.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 8,
                    bottom: 8,
                    right: (theme) => theme.spacing(-0.75),
                    borderColor: 'var(--Color-greyscale-300)',
                  }}
                />
              )}
              <Box sx={{ padding: '24px 16px' }}>
                <TextBlock title={title} desc={desc} align="center" size="lg" />
              </Box>
            </Grid>
          ))}
        </Grid>
        <SectionTitle>
          <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="h3" color="var(--Color-greyscale-1000)">
              거래자산
            </Typography>
            <Typography variant="h3" color="var(--Color-greyscale-500)">
              {assetCount}
            </Typography>
            </Box>
            <Box>
              <AppDropdownMenuButton
                defaultLabel="거래금액"
                options={[
                  { label: '거래금액', value: 'amount' },
                  { label: '거래횟수', value: 'count' },
                  { label: '코인명', value: 'coinname' },
                ]}
                onSelect={(option) => onDownload(option.value)}
              />
            </Box>
          </Box>
        </SectionTitle>
        <DayAssetsCharts>
          <DashboardCharts stats={stats} loading={isLoading} />
        </DayAssetsCharts>
      </Box>
    </Box>
  );
};

const AssetToolBar = styled.div`
  background: var(--Color-greyscale-200);
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`;

const DayAssetsCharts = styled.div`
  display: grid;
  padding: 24px 32px 32px 32px;
  gap: 28px;
`;
