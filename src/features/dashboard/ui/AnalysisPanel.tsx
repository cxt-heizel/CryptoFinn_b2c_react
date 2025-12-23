import { ReactNode, useCallback, useMemo } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TextBlock } from '../../../shared/ui/TextBlock';
import {
  BestExchangeDatum,
  FavoriteChartDatum,
  IncomeChartDatum,
  MostCoinDatum,
  RankBar,
  TransactionChartDatum,
} from '../model/dashboardData';
import { SectionTitle } from './SectionTitle';

type Props = {
  isWide: boolean;
  transactions: TransactionChartDatum[];
  income: IncomeChartDatum[];
  favorites: FavoriteChartDatum[];
  bestExchanges: BestExchangeDatum[];
  topHoldings: MostCoinDatum[];
  ranks: RankBar[];
};

const ChartCard = ({ id, children }: { id?: string; children: ReactNode }) => (
  <Box sx={{ p: 2 }} id={id}>
    {children}
  </Box>
);

const SplitSection = ({ isWide, children }: { isWide: boolean; children: ReactNode[] }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: isWide ? 'row' : 'column',
      alignItems: 'stretch',
    }}
  >
    {children[0]}
    <Divider
      orientation={isWide ? 'vertical' : 'horizontal'}
      flexItem
      sx={isWide ? undefined : { my: 0.5 }}
    />
    {children[1]}
  </Box>
);

export const AnalysisPanel = ({
  isWide,
  transactions,
  income,
  favorites,
  bestExchanges,
  topHoldings,
  ranks,
}: Props) => {
  const favoriteRate = useMemo(() => favorites[0]?.value ?? 0, [favorites]);

  const renderIncomeLabel = useCallback((props: any) => {
    const { x, y, width, payload } = props;
    if (!payload?.showLabel) return null;

    const bubbleWidth = 96;
    const bubbleHeight = 32;
    const pointer = 6;
    const bubbleX = x + width / 2 - bubbleWidth / 2;
    const bubbleY = y - bubbleHeight - pointer - 6;
    const pointerPath = `M${x + width / 2 - 8},${bubbleY + bubbleHeight} L${x + width / 2 + 8},${bubbleY + bubbleHeight} L${x + width / 2},${bubbleY + bubbleHeight + pointer} Z`;

    return (
      <g>
        <rect x={bubbleX} y={bubbleY} width={bubbleWidth} height={bubbleHeight} rx={10} fill="var(--Color-greyscale-500)" />
        <path d={pointerPath} fill="var(--Color-greyscale-500)" />
        <text
          x={bubbleX + bubbleWidth / 2}
          y={bubbleY + bubbleHeight / 2 + 4}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight={700}
        >
          {payload.label}
        </text>
      </g>
    );
  }, []);

  const renderIncomeValueLabel = useCallback((props: any) => {
    const { x, y, width, value, payload } = props;
    if (payload?.showLabel) return null;
    return (
      <text
        x={x + width / 2}
        y={y + 16}
        textAnchor="middle"
        fill="var(--Color-greyscale-800)"
        fontSize={15}
        fontWeight={600}
      >
        {`${value}만원`}
      </text>
    );
  }, []);

  const renderBestExchangeLabel = useCallback((props: any) => {
    const { x, y, width, payload } = props;
    if (!payload) return null;

    const centerX = x + width / 2;
    const labelText = payload.label ?? '';

    if (payload?.showBubble) {
      const bubbleWidth = 110;
      const bubbleHeight = 32;
      const pointer = 6;
      const bubbleX = centerX - bubbleWidth / 2;
      const bubbleY = y - bubbleHeight - pointer - 8;
      const pointerPath = `M${centerX - 8},${bubbleY + bubbleHeight} L${centerX + 8},${bubbleY + bubbleHeight} L${centerX},${bubbleY + bubbleHeight + pointer} Z`;

      return (
        <g>
          <rect x={bubbleX} y={bubbleY} width={bubbleWidth} height={bubbleHeight} rx={10} fill="var(--Color-greyscale-700)" />
          <path d={pointerPath} fill="var(--Color-greyscale-700)" />
          <text
            x={centerX}
            y={bubbleY + bubbleHeight / 2 + 4}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            fontWeight={700}
          >
            {labelText}
          </text>
        </g>
      );
    }

    return (
      <text
        x={centerX}
        y={y - 8}
        textAnchor="middle"
        fill="var(--Color-greyscale-800)"
        fontSize={14}
        fontWeight={600}
      >
        {labelText}
      </text>
    );
  }, []);

  return (
    <Box>
      <Box sx={{ bgcolor: 'var(--Color-greyscale-000)' }}>
        <SectionTitle>
          <Box>
            <Typography variant="h3" color="var(--Color-greyscale-1000)">
              분석
            </Typography>
          </Box>
        </SectionTitle>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: 0,
          px: 0,
          py: isWide ? 2 : 1.5,
        }}
      >
        <ChartCard id="transactions-chart">
          <TextBlock title="13,564건" desc="수집된 거래내역" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            최저 2021년 | 최고 2023년
          </Typography>
          <Box sx={{ height: 260, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                <CartesianGrid strokeDasharray="4 6" stroke="var(--Color-greyscale-300)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: 'var(--Color-greyscale-800)', fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip cursor={false} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--Color-greyscale-600)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="var(--Color-greyscale-300)"
                  fillOpacity={0.22}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
        <Divider />
        <SplitSection isWide={isWide}>
          <ChartCard id="income-chart">
            <TextBlock title="513,258,147원" desc="지금까지의 총 소득은?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              최저소득 2021년 | 최고소득 2023년
            </Typography>
            <Box sx={{ height: 320, mt: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={income} margin={{ top: 20, right: 16, left: 8, bottom: 12 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 6" stroke="var(--Color-greyscale-200)" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: 'var(--Color-greyscale-800)', fontSize: 14 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <Tooltip cursor={false} />
                  <Bar
                    dataKey="value"
                    radius={[14, 14, 14, 14]}
                    barSize={120}
                    label={renderIncomeLabel}
                    isAnimationActive={false}
                  >
                    {income.map((entry) => (
                      <Cell key={entry.year} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" content={renderIncomeValueLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
          <ChartCard id="favorit-chart">
            <TextBlock title="바이낸스" desc="내 최애 거래소는?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              전체 거래 중 {favoriteRate}%
            </Typography>
            <Box sx={{ position: 'relative', height: 280, mt: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="68%"
                  outerRadius="82%"
                  data={favorites}
                  startAngle={90}
                  endAngle={-270}
                  barSize={18}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill="var(--Color-greyscale-800)"
                    background={{ fill: 'var(--Color-greyscale-200)' }}
                    clockWise
                    isAnimationActive={false}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  color: 'var(--Color-greyscale-900)',
                  fontWeight: 700,
                  fontSize: 32,
                }}
              >
                {favoriteRate}%
              </Box>
            </Box>
          </ChartCard>
        </SplitSection>
        <Divider />
        <SplitSection isWide={isWide}>
          <ChartCard id="best-exchange-chart">
            <TextBlock title="업비트" desc="지난 해, 소득이 가장 많았던 곳은?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              에서 가장 많이 벌었어요
            </Typography>
            <Box sx={{ height: 320, mt: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bestExchanges} margin={{ top: 20, right: 16, left: 0, bottom: 12 }}>
                  <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="var(--Color-greyscale-300)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--Color-greyscale-800)', fontSize: 14 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <ReferenceLine y={0} stroke="var(--Color-greyscale-400)" strokeDasharray="6 6" />
                  <Tooltip cursor={false} />
                  <Bar
                    dataKey="value"
                    radius={[14, 14, 0, 0]}
                    barSize={120}
                    label={renderBestExchangeLabel}
                    isAnimationActive={false}
                  >
                    {bestExchanges.map((entry) => (
                      <Cell key={entry.name} fill={entry.barColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartCard>
          <ChartCard id="most-coin-chart">
            <TextBlock title="이더리움" desc="지금, 가장 많이 보유한 자산은?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              전체 자산 중 {topHoldings[0]?.value ?? 0}%
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ position: 'relative', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topHoldings}
                      dataKey="value"
                      nameKey="name"
                      cx="65%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      startAngle={170}
                      endAngle={-190}
                      cornerRadius={12}
                      paddingAngle={2}
                      isAnimationActive={false}
                    >
                      {topHoldings.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    borderTop: '2px dashed var(--Color-greyscale-400)',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Stack direction="column" spacing={1.2} sx={{ pl: 0.5 }}>
                {topHoldings.map((item) => (
                  <Stack key={item.name} direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                    <Typography sx={{ flex: 1 }} color="var(--Color-greyscale-800)">
                      {item.name}
                    </Typography>
                    <Typography color="var(--Color-greyscale-800)" fontWeight={600}>
                      {item.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </ChartCard>
        </SplitSection>
        <Divider />
        <ChartCard id="rank-chart">
          <TextBlock title="상위 0.02%" desc="내 자산 순위는?" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            최상위 고액 자산가예요
          </Typography>
          <Box sx={{ position: 'relative', height: 403, mt: 3 }}>
            <Box
              sx={{
                position: 'absolute',
                top: '32%',
                left: 0,
                right: 0,
                borderTop: '2px dashed var(--Color-greyscale-400)',
                pointerEvents: 'none',
              }}
            />
            <Stack
              spacing={1.4}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'flex-end',
              }}
            >
              {ranks.map((bar) => (
                <Box
                  key={bar.key}
                  sx={{
                    height: 48,
                    width: `${bar.width}%`,
                    ml: 'auto',
                    mr: `${bar.offset}%`,
                    borderRadius: '14px',
                    background: bar.highlight ? 'var(--Color-greyscale-800)' : 'var(--Color-greyscale-300)',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </ChartCard>
      </Box>
    </Box>
  );
};
