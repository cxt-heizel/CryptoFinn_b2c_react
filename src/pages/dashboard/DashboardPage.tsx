import * as React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import styled from '@emotion/styled'
import { DashboardCharts } from '../../features/dashboard/ui/DashboardCharts';
import { useDashboardStatsQuery } from '../../features/dashboard/hooks/useDashboardStatsQuery';
import { AppDatePicker } from '../../shared/ui/AppDatePicker';
import { AppDropdownMenuButton } from '../../shared/ui/AppDropdownMenuButton';
import { TextBlock } from '../../shared/ui/TextBlock';
import { AppButton } from '../../shared/ui/AppButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';



import SyncRoundedIcon from '@mui/icons-material/SyncRounded';



const TitleContainer = styled.div`
  padding: 20px 32px;
`
const AssetToolBar = styled.div`
  background: var(--Color-greyscale-200);
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`

const DayAssetsCharts = styled.div`
  display: grid;
  padding: 24px 32px 32px 32px;
  gap: 28px;
`

export const DashboardPage = () => {
  const { data = [], isLoading } = useDashboardStatsQuery();

  const handleDownload = React.useCallback(async (format: string) => {
    // TODO: 실제 다운로드 로직을 연결하세요.
    alert(`다운로드: ${format}`);
  }, []);

  const DashboardStat = [
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
    {
      label: '134,545,432원',
      value: '88.88888888 | 32%'
    },
  ]

  const summaryStats = [
    { title: '+1,009,890 원', desc: '실현손익' },
    { title: '1,205,000 건', desc: '거래 데이터' },
    { title: '15 건', desc: '제외 데이터' },
  ];

  return (
    <>
      <Box>
        <TitleContainer>
          <Box>
            <Typography variant="h3" color='var(--Color-greyscale-1000);'>
              보유자산
            </Typography>
          </Box>
        </TitleContainer>
        <AssetToolBar>
          <Box sx={{display:'flex', alignItems:'center'}}>
            <AppDatePicker/>
          </Box>
          <Box sx={{display:'flex', alignItems:'center',justifyContent:'flex-end', gap: 1}}>
            <Box sx={{display:'flex', alignItems:'center', gap: 0.5, color:'var(--Color-greyscale-800)'}}>
              <Typography variant='subtitle1' sx={{whiteSpace: 'nowrap'}}>
                2023.08.28  23:12 기준
              </Typography>  
              <SyncRoundedIcon fontSize='inherit'/>
            </Box>
            <Box>
              <AppDropdownMenuButton
                defaultLabel="다운로드"
                options={[
                  { label: 'PDF', value: 'PDF' },
                  { label: 'XLS', value: 'XLS' },
                ]}
                onSelect={(option) => handleDownload(option.value)}
              />
            </Box>
          </Box>
        </AssetToolBar>
        <DayAssetsCharts >
          <TextBlock title="151,043,961원" desc="전체 보유자산" size='lg' titleFirst={false}></TextBlock>
          <Divider />
          <DashboardCharts stats={DashboardStat}></DashboardCharts>
        </DayAssetsCharts>
      </Box>
      <Box sx={{bgcolor:'var(--Color-greyscale-000)'}}>
        <TitleContainer>
          <Box sx={{display:'flex', gap: 1}}>
            <Typography variant="h3" color='var(--Color-greyscale-1000);'>
              2025년
            </Typography>
            <AppButton
              size="small"
              variant="outlined"
              sx={{ minWidth: 'unset', p: '1px' }}
              // onClick={handlePrevDay}
            >
              <ChevronLeftRoundedIcon fontSize="small" />
            </AppButton>
            <AppButton
              size="small"
              variant="outlined"
              sx={{ minWidth: 'unset', p: '1px' }}
              // onClick={handlePrevDay}
            >
              <ChevronRightRoundedIcon fontSize="small" />
            </AppButton>
          </Box>
        </TitleContainer>
        <Divider />
        <Grid container spacing={1.5} sx={{ py: 3, px:4 }}>
          {summaryStats.map(({ title, desc }, idx) => (
            <Grid
              key={desc}
              size={{ xs: 12, md: 4 }}
              sx={{ position: 'relative' }}
            >
              {idx < summaryStats.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 8,
                    bottom: 8,
                    right: (theme) => theme.spacing(-0.75), // center in grid spacing gap
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
        <TitleContainer>
          <Box sx={{display:'flex', gap: 1}}>
            <Typography variant="h3" color='var(--Color-greyscale-1000);'>
            거래자산 
            </Typography>
            <Typography variant="h3" color='var(--Color-green-500)'>11</Typography>
          </Box>
        </TitleContainer>
        <DayAssetsCharts>
          <DashboardCharts stats={DashboardStat}></DashboardCharts>
        </DayAssetsCharts>
      </Box>
    </>
  );
};
