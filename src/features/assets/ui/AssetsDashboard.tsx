import { Fragment } from 'react';
import {
  Badge,
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  categoryLabels,
  ExchangeMeta,
  PlatformCategory,
  PlatformStatus,
  statusLabels,
  UserExchange,
  formatUpdatedAt,
} from '../model/types';
import { SectionHeader } from './atoms/SectionHeader';
import { StackHeader } from './atoms/StackHeader';
import { TextBlock } from '../../../shared/ui/TextBlock';

type Props = {
  exchanges: UserExchange[];
  pending?: ExchangeMeta[];
  statusMap: Record<number, PlatformStatus>;
};

const groupByCategory = (connected: UserExchange[], pending: ExchangeMeta[] = []) => {
  const base: Record<PlatformCategory, Array<UserExchange | ExchangeMeta>> = { L: [], F: [], W: [] };
  connected.forEach((item) => base[item.category].push(item));
  pending.forEach((item) => base[item.category].push(item));
  return base;
};

const renderConnectedInfo = (item:object) => {
  console.log( item );
  let apiTemplate = ``;
  let fileTemplate = ``;
  let addressTemplate = ``;

  if( item['api_key'].length !== 0 ){
    apiTemplate = `
      api key : ${item.api_key}
    `
  }
  if( item['file_list'].length !== 0 ){
    fileTemplate = item['file_list'].map( el => {
      return `file : ${el.file_name}`
    }).join('')
  }
  if( item['address'] !== null ){
    addressTemplate = item.address
  }

  return( apiTemplate + fileTemplate + addressTemplate );

}

export const AssetsDashboard = ({ exchanges, pending = [], statusMap }: Props) => {
  const grouped = groupByCategory(exchanges, pending);
  const lastUpdated = exchanges
    .map((e) => e.updated_at)
    .filter(Boolean)
    .sort()
    .reverse()[0];
  const totalAmountLabel = '940,520원';
  const pendingCount = pending.length;

  return (
    <Stack sx={{ height: '100%', overflow: 'visible'}}>
      <SectionHeader>
        데이터 연결 현황
      </SectionHeader>
      <Box sx={{flex:1, bgcolor:'white'}}>
        <Stack spacing="1px" sx={{bgcolor:'var(--Color-greyscale-300)', pb:'1px'}}>
          {(['L', 'F', 'W'] as PlatformCategory[]).map((category) => {
            const list = grouped[category];
            if( list.length === 0 ){
              return (
                <Stack key={category} sx={{gap: '1px'}}>
                  <StackHeader>
                    연결 {categoryLabels[category]} 없음
                  </StackHeader>
                </Stack>
              )
            }else if( list.length > 0 ){
              return(
              <Stack key={category} sx={{gap: '1px'}}>
                <StackHeader>
                  {categoryLabels[category]}
                </StackHeader>
                {list.map((item)=>{
                  const isConnected = 'seq_user_exchange' in item;
                  const status = isConnected ? statusMap[item.seq_user_exchange] : undefined;
                  const label = status ? statusLabels[status] : undefined;
                  if( isConnected && status==="Normal"){
                    return (
                      <Box
                          sx={{
                            width: '100%',
                            display:'flex',
                            bgcolor:'white',
                            alignItems: 'flex-start',
                            justifyContent:'space-between',
                            height: 86,
                            py: 3, 
                            px:2
                          }}
                        >
                        <TextBlock 
                          slotProps={{root:{
                              height: '100%',
                              justifyContent:'space-between',
                            }}
                          }
                          title={ isConnected&&label ? label.label : '데이터를 연결해주세요' }
                          desc={ isConnected&&label ? renderConnectedInfo(item) : null }
                        />
                        <TextBlock 
                          align = 'right'
                          titleFirst={false}
                          slotProps={{root:{
                              justifyContent:'space-between',
                              height: '100%,'
                            }}
                          }
                          size='lg'
                          title={null}
                          desc={'업데이트 : '+item.updated_at}
                        />
                      </Box>
                    )    
                  }else{
                    return(
                      <Box
                        sx={{
                          width: '100%',
                          display:'flex',
                          bgcolor:'white',
                          alignItems: 'center',
                          justifyContent:'center',
                          height: 86,
                          py: 3, 
                          px:2
                        }}
                      >
                        <TextBlock 
                          slotProps={{root:{
                              height: '100%',
                            }}
                          }
                          size='lg'
                          desc={ isConnected&&label ? label.label : '연결을 완료해주세요' }
                          title={null}
                        />
                      </Box>
                    )
                  }
                })}
              </Stack>
              )
            }
          })}
        </Stack>
      </Box>
    </Stack>
  );
};
