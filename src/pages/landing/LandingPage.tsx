import { Box, Container, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LandingTitle } from '../../features/landing/ui/LandingTitle'
import { LandingCardContent } from '../../features/landing/ui/LandingCardContent'
import { MainIntroGraphics } from '../../features/landing/ui/MainIntroGraphics'
import { DarkSection } from '../../features/landing/ui/DarkSection'
import { AppButton } from '../../shared/ui/AppButton'
import { red } from '@mui/material/colors';

const ContainerSX = {
  display: 'grid',
  justifyItems: 'center',
  px: { xs: 14, md: 16 },
  py: { xs: 25, md: 75 },
  gap: { xs: 15, md: 40 },
};


const ASSET_BASE = 'https://dev-www.cryptofinn.io/assets';
const PRODUCT_IMAGE = `${ASSET_BASE}/images/product`;
const SYMBOL_IMAGE = `${ASSET_BASE}/images`;
const LOGO_IMAGE = `${ASSET_BASE}/images/logo`;

type StatCard = {
  title: JSX.Element;
  icons: string[];
  description?: string;
};

const statCards: StatCard[] = [
  {
    title: (
      <>
        대한민국 국민 3명 중 1명<Typography component="span" variant="body1" sx={{ display: 'inline' }}>은</Typography>
        <br />
        가상자산 투자자
      </>
    ),
    icons: [
      `${PRODUCT_IMAGE}/tax_2_1_icon.svg`,
      `${PRODUCT_IMAGE}/tax_2_2_icon.svg`,
      `${PRODUCT_IMAGE}/tax_2_2_icon.svg`,
    ],
  },
  {
    title: <>2027년 과세 시행, 카운트다운</>,
    description:
      '가상자산 과세는 2027년으로 유예되었지만, 이는 시장에 준비할 시간을 부여한 것에 불과합니다. 법제화의 방향은 이미 확정된 미래입니다.',
    icons: [],
  },
];

const painPoints = [
  {
    title: '복잡한 세법',
    description: '계속해서 변화하는 과세기준과 명확하지 않은 신고 방식으로 많은 개인 투자자들이 혼란을 겪고 있음',
    image: `${PRODUCT_IMAGE}/tax_2_1.jpg`,
  },
  {
    title: '복잡한 거래내역',
    description:
      '여러 거래소와 지갑을 이용하는 개인이 직접 거래 내역을 통합하고 시점별 시세나 환율까지 반영해 정리하기는 까다로움',
    image: `${PRODUCT_IMAGE}/tax_2_2.jpg`,
  },
  {
    title: '해외거래 신고',
    description: '해외 거래소나 개인 지갑에서 발생한 일부 거래는 신고 대상 여부가 불분명하고 누락 시 불이익 위험이 있음',
    image: `${PRODUCT_IMAGE}/tax_2_3.jpg`,
  },
];

const steps = [
  {
    number: '1',
    title: '원클릭 연동',
    description: '국내외 거래소와 지갑을 API로 안전하고 간편하게 연결하세요. CSV 파일 업로드도 물론 가능합니다.',
    color: '#A229C5'
  },
  {
    number: '2',
    title: '과세소득 계산',
    description: '거래 당시의 코인 시가와 적용되는 환율 데이터를 반영해 정확한 과세소득 계산 결과를 제공합니다.',
    color: '#8E34D5'
  },
  {
    number: '3',
    title: '맞춤형 세금 보고서',
    description: '국세청 제출 양식부터 맞춤형 분석 리포트까지 자동 생성하여 세금 납부와 투자 의사결정에 활용할 수 있습니다.',
    color: '#7B3FE4'
  },
];

const integrations = [
  { alt: 'Bithumb', src: `${SYMBOL_IMAGE}/symbol_bithumb.svg`, sx: { height: { xs: 26, md: 30 } } },
  { alt: 'Upbit', src: `${SYMBOL_IMAGE}/symbol_upbit.svg`, sx: { width: { xs: 30, md: 33 } } },
  { alt: 'Binance', src: `${SYMBOL_IMAGE}/symbol_binance.svg`, sx: { height: { xs: 24, md: 26 } } },
  { alt: 'Ethereum', src: `${SYMBOL_IMAGE}/symbol_ethereum.svg`, sx: { height: { xs: 26, md: 28 } } },
  { alt: 'Polygon', src: `${SYMBOL_IMAGE}/symbol_polygon.svg`, sx: { width: { xs: 24, md: 26 } } },
  { alt: 'Solana', src: `${SYMBOL_IMAGE}/symbol_solana.svg`, sx: { width: { xs: 23, md: 23 } } },
  { alt: 'Wemix', src: `${SYMBOL_IMAGE}/symbol_wemix.svg`, sx: { height: { xs: 24, md: 26 } } },
];

const serviceHighlights = [
  { title: '세금 시뮬레이션', description: '최신규정으로 산출하여 정확한' },
  { title: '통합 대시보드', description: '내 거래 데이터가 반영된' },
  { title: '해외금융계좌 리포트', description: '6월 해외금융 계좌신고를 위한' },
];

const features = [
  {
    title: '실시간 포트폴리오 현황',
    description: '모든 자산을 한 곳에서 통합 관리하며, 수익률 변화를 실시간으로 확인하세요.',
    desktopImage: `${PRODUCT_IMAGE}/tax_3_1.png`,
    mobileImage: `${PRODUCT_IMAGE}/tax_3_1_m.png`,
    align: 'left',
    desktopImageWidth:'590px',
  },
  {
    title: '해외금융계좌 리포트',
    description:
      '해외금융계좌 신고 여부 판단에 필요한 핵심 정보를 그래프로 제공하며, 과세 서식에 맞춰 월말 기준 거래소별 가상자산 잔액 정보까지 제공합니다.',
    desktopImage: `${PRODUCT_IMAGE}/tax_3_2.png`,
    mobileImage: `${PRODUCT_IMAGE}/tax_3_2_m.png`,
    align: 'left',
    desktopImageWidth:'540px',
  },
  {
    title: '전문가 연계 서비스 준비중',
    description: '복잡한 케이스는 제휴 세무법인의 전문가와 상담하여 완벽하게 해결하세요.',
    desktopImage: `${PRODUCT_IMAGE}/tax_3_3.png`,
    mobileImage: `${PRODUCT_IMAGE}/tax_3_3_m.png`,
    align: 'center',
    desktopImageWidth:'382px',
  },
];

const faqs = [
  {
    question: '크립토핀은 세무 대리와 기장 대행을 직접 해주는 서비스인가요?',
    answer:
      '아니요, 크립토핀에서는 직접적인 세무 대리와 기장 대행 업무를 수행하지 않습니다. 저희 서비스는 복잡한 가상자산 거래 내역을 수집하고 정리하여 사용자가 세무 신고를 원활하게 진행할 수 있도록 돕는 "세무 보조 자동화 솔루션" 입니다.\n\n세무 대리, 절세상담, 기장대행, 세금환급 등 세무사/회계사 자격이 필요한 업무에 대해서는 가까운 세무/회계 사무소에 문의 주시거나, 원하시는 경우 저희와 제휴를 맺고 있는 세무/회계 법인에 연결해 드리고 있습니다.',
  },
  {
    question: 'API 정보는 안전하게 관리 되나요?',
    answer:
      '1. 암호화 저장 - 발급된 API 키는 평문으로 저장되지 않으며, 검증된 암호화 알고리즘을 사용해 안전하게 보관합니다.\n2. 전송 구간 보호 - API 키가 네트워크를 통해 전달될 때는 TLS(HTTPS) 암호화를 적용해 중간 탈취를 방지합니다.\n3. 최소 권한 원칙 - API 키는 필요한 범위에서만 사용되며, 사용 범위가 최소화됩니다.\n4. 접근 통제 및 감사 로그 - API 키에 대한 사용내역은 모두 로그 처리되며 주기적으로 모니터링하여 무단 사용을 방지합니다.',
  },
  {
    question: '투자 손실이 발생하면 세금은 어떻게 되나요?',
    answer:
      '투자 손실이 발생하면 해당 연도에는 세금을 내지 않습니다. 또한, 다른 연도 간 손익통산 규정이 아직은 존재하지 않으므로 이월/소급 공제는 불가합니다.',
  },
  {
    question: '세금 신고를 하지 않으면 어떤 불이익이 있나요?',
    answer: '신고 및 납부 지연 관련 가산세가 부과될 수 있습니다.',
  },
  {
    question: '여러 거래소에 자산이 흩어져 있는데, 취득가액은 어떻게 계산되나요?',
    answer:
      '여러 거래소에 자산이 흩어져 있더라도 시스템 상에서 거래내역을 시간순서대로 통합합니다. 거래 내역이 빠짐없이 반영되었다면, 선택하신 취득원가 계산 방식에 따라 자동으로 원가가 계산됩니다.',
  },
  {
    question: '가족에게 코인을 증여했는데 이것도 과세 대상이 되나요?',
    answer: '가상자산 소득세 과세 대상은 아니지만, 증여세가 부과될 수 있습니다.',
  },
  {
    question: '가상자산을 물건 구매에 사용한 경우에도 과세 대상이 되나요?',
    answer:
      '네, 가상자산을 물건 구매에 사용한 경우 대물변제로 보아 실현 손익을 인식합니다. 이 때, 물건 가격이 총 수입금액이 되어 과세 소득을 구하게 됩니다.',
  },
];

export const LandingPage = () => {
  const handleContactClick = () => {
    window.location.href = '/contact#tax';
  };

  return (
    <>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container sx={{ px: { xs: 14, md: 16 }, pt: 60, pb: 75, display: 'grid', gap: 60 }}>
          <LandingTitle isMain />
          <Box>
            <AppButton size="large" variant="contained" onClick={handleContactClick}>
              개인 세무 서비스 문의하기
            </AppButton>
          </Box>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{
          height: { xs: 320, md: 400 },
          backgroundImage: `url('${ASSET_BASE}/images/b2c_main.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 58%',
          backgroundSize: 'cover',
        }}
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container sx={ContainerSX}>
          <LandingTitle
            h1={<>가상자산 세금 신고준비, 이제 필수입니다</>}
            h2={
              <>
                국내 가상자산 시장은 1,600만 명 이상의 투자자가 참여하는 대규모 투자 생태계로 성장했습니다
                <br />
                하지만 과세 체계가 여전히 복잡하고 불명확해 많은 투자자들이 사전에 어떻게 대비해야 할지 어려움을 느끼고 있습니다
              </>
            }
          />
          <Box sx={{ width: { xs: '100%', md: 900 } }}>
            <Grid container spacing={0.5} sx={{ bgcolor: 'var(--grey-200)', px: { xs: 0, md: 0.5 },py: { xs: 0.5, md: 0 } }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <LandingCardContent
                  title={statCards[0].title}
                  align="center"
                  slotProps={{
                    root: {
                      borderRadius: 0,
                      px: { xs: 4, md: 8 },
                      py: { xs: 10, md: 12 },
                      height: '100%',
                      bgcolor: 'var(--grey-000)',
                      justifyContent: 'space-between',
                    },
                  }}
                >
                  <Stack direction="row" spacing={3} justifyContent="center">
                    {statCards[0].icons.map((icon) => (
                      <Box
                        key={icon}
                        component="img"
                        src={icon}
                        sx={{
                          height: { xs: 26, md: 32 },
                          width: { xs: 23, md: 28 },
                        }}
                      />
                    ))}
                  </Stack>
                </LandingCardContent>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <LandingCardContent
                  title={statCards[1].title}
                  align="center"
                  slotProps={{
                    root: {
                      px: { xs: 6, md: 10 },
                      py: { xs: 10, md: 12 },
                      height: '100%',
                      bgcolor: 'var(--grey-000)',
                      justifyContent: 'center',
                    },
                  }}
                >
                  <Typography variant="body1">{statCards[1].description}</Typography>
                </LandingCardContent>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: { xs: '100%', md: 1376 } }}>
            <Grid container columnSpacing={5} rowSpacing={5}>
              {painPoints.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      height: { xs: 220, md: 300 },
                      backgroundImage: `linear-gradient(180deg, rgba(37,23,23,0.6), rgba(37,23,23,0.6)), url(${item.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center 58%',
                      backgroundSize: 'cover',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      px: { xs: 10, md: 16 },
                      py: { xs: 8, md: 10 },
                    }}
                  >
                    <LandingCardContent
                      title={<>{item.title}</>}
                      align="center"
                      gap={15}
                      slotProps={{
                        root: {
                          width: '100%',
                          px: { xs: 4, md: 6 },
                          py: { xs: 4, md: 6 },
                          height: '100%',
                          justifyContent: 'center',
                          color: '#fff',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: 'var(--grey-300)' }}>
                        {item.description}
                      </Typography>
                    </LandingCardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <DarkSection>
        <Box sx={{ bgcolor: 'background.default' }}>
          <Container sx={ContainerSX}>
            <LandingTitle
              h1={
                <>
                  3단계 만으로 세금 신고 준비 끝
                  <br />
                  크립토핀 개인 세무 서비스가 가장 쉽고 정확한 해결책을 제시합니다
                </>
              }
              h2={<>흩어진 거래 내역 통합부터 복잡한 과세소득 계산까지 한 번에 자동으로 처리해 드립니다</>}
            />
            <Grid container sx={{ width: { xs: '100%', md: '100%' }, gap:{xs:'30px', md:'unset'}, justifyContent:'space-between', position:'relative'}}>
              {steps.map((step) => (
                <Grid key={step.number} size={{ xs: 12, md: 3.5 }} sx={{zIndex:1}}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: {xs:5,md:10}
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      background: step.color,
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      fontWeight: 600,
                      lineHeight: 1,
                      textAlign:'center',
                      fontSize: {
                        xs : 18,
                        md : 20,
                      }
                    }}>
                      {step.number}
                    </Box>
                    <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 700, textAlign:'center' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', textAlign:'center' }}>
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              <Box sx={{
                display: {xs:'none', md:'block'},
                position: 'absolute',
                height: '2px',
                width: '100%',
                background: 'linear-gradient(90deg, rgba(162, 41, 197, 0.00) 0%, rgba(162, 41, 197, 0.80) 20%, rgba(123, 63, 228, 0.80) 80%, rgba(123, 63, 228, 0.00) 100%)',
                top: '25px',
                zIndex:0
              }}></Box>
            </Grid>
            <MainIntroGraphics symbols={integrations} highlights={serviceHighlights} logoSrc={LOGO_IMAGE} />
            <Typography variant="caption" sx={{ color: 'text.tertiary', textAlign: 'center' }}>
              * 크립토핀에서는 세금 신고 대행 업무나 기장 대행 업무를 직접 수행하지 않습니다.
            </Typography>
          </Container>
        </Box>
      </DarkSection>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container sx={ContainerSX}>
          <LandingTitle
            h1={<>세금신고 그 이상의 가치</>}
            h2={<>단순한 세금 계산을 넘어, 성공적인 투자를 위한 다양한 기능을 제공합니다</>}
          />
          <Grid container spacing={20} sx={{maxWidth:{xs: 450, md:'unset'}}}>
            {features.map((feature) => (
              <Grid container
                size={{xs: 12, md: 4}}
                sx={{
                  background: 'radial-gradient(68% 70.71%, rgb(221, 226, 238) 53.44%, rgb(194, 203, 225) 100%)',
                  boxShadow: 'rgba(1, 33, 103, 0.15) 0px 8px 30px 0px',
                  overflow: 'hidden',
                  borderRadius: 2.5,
                  pb: 0,
                  justifyContent: feature.align 
                }}
              >
                <Box sx={{ display: 'grid', gap: 4, alignItems:'center', p: 20, pb:0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: feature.align , gap: 4 }}>
                  <Box
                    component="img"
                    className="desktop-only"
                    src={feature.desktopImage}
                    alt={feature.title}
                    sx={{ maxWidth: { xs: '100%', md: feature.desktopImageWidth }}}
                  />
                  <Box
                    component="img"
                    className="mobile-only"
                    src={feature.mobileImage}
                    alt={feature.title}
                    sx={{ width: '100%'}}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: 'background.grey' }}>
        <Container sx={ContainerSX}>
          <LandingTitle
            h1={<>자주 묻는 질문</>}
            h2={<>서비스 이용 과정에서 자주 문의하시는 사항을 정리하여 안내드립니다.</>}
          />
          <Stack  sx={{ width: '100%', borderRadius: 0,}}>
            {faqs.map((faq, idx) => (
              <Accordion
                key={faq.question}
                disableGutters
                square={false}
                defaultExpanded={idx === 0}
                sx={{
                  bgcolor: 'background.grey' ,
                  borderBottom: '1px solid var(--grey-200)',
                  boxShadow: 'none',
                  '&::before': { display: 'none' },
                  '&:first-child':{borderTop: '2px solid var(--grey-800)', borderRadius:0},
                  '&:last-child':{ borderRadius:0}
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, p: '30px 20px', }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: 'text.secondary', p: 10, pt:0,pb: 15 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
