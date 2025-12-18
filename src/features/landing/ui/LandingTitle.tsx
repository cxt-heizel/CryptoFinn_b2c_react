import { Box, Button, Stack, Typography } from '@mui/material';
import { UserMenu } from '../../auth/ui/UserMenu';
import { AppButton } from '../../../shared/ui/AppButton'
import styled from '@emotion/styled'



const MainbTitleBox = styled.div`
  display:flex;
  flex-wrap: wrap;
  gap: 0 10px;
  #title_cryptofinn{
    aspect-ratio: 310/57;
    height: 14dvw;
    max-height: 80px;
  }
  #title_tax{
      aspect-ratio: 108/61;
      height: 14dvw;
      max-height: 80px;
  }
`

interface Props {
  isMain? : boolean;
  hasCaption?: boolean;
  h1?: React.ReactNode;
  h2?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const LandingTitle = ({ isMain, h1, h2, hasCaption, align='center' }: Props) => {

  if( isMain ){
    return (
      <Box sx={{
          display: 'grid',
          gap: 20,
      }}>
        <MainbTitleBox>
          <h1 hidden>cryptofinn tax</h1>
          <Box component="img" className="desktop-only" src="https://dev-www.cryptofinn.io/assets/images/product/d_title_tax.svg" alt="cryptofinn tax" />
          <Box component="img" className="mobile-only" id="title_cryptofinn" src="https://dev-www.cryptofinn.io/assets/images/product/m_title_cryptofinn.svg" />
          <Box component="img" className="mobile-only" id="title_tax" src="https://dev-www.cryptofinn.io/assets/images/product/m_title_tax.svg" />
        </MainbTitleBox>
        <Typography variant="h3" sx={{color: 'text.primary'}}>가상자산 세금, 더 이상 혼란은 그만</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary'}}>
          패시브 투자자부터 액티프 트레이더까지 모든 개인 투자자들을 위한 최적의 세금 솔루션을 제공합니다.<br/>
          복잡한 가상자산 세금 계산, 크립토핀에 맡겨주세요
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.tertiary'}}>
          * 크립토핀에서는 세금 신고 대행 업무나 기장 대행 업무를 직접 수행하지 않습니다.
        </Typography>
      </Box>
    )
  }else if( !isMain ){
    return (
      <Box sx={{
        display: 'grid',
        gap: 14,
        textAlign: align}}>
      <Typography variant="h4" sx={{ color: 'text.primary'}}>{h1}</Typography>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary'}}>{h2}</Typography>
      {hasCaption && (
        <Typography variant="caption" sx={{ color: 'text.tertiary' }}>
          * 크립토핀에서는 세금 신고 대행 업무나 기장 대행 업무를 직접 수행하지 않습니다.
        </Typography>
      )}
    </Box>
    );
  }
};
