import { Children, useCallback, useMemo } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  ContentRenderer,
  LabelProps,
} from 'recharts';
import { TextBlock } from '../../../shared/ui/TextBlock';
import {
  AXIS_TICK_STYLE,
  BAR_CHART_MARGIN,
  ChartCard,
  ChartContainer,
  DEFAULT_BAR_SIZE,
  FAVORITE_CHART_WIDTH,
} from './chartPrimitives';
import { TransactionsChart } from './charts/TransactionsChart';
import {
  YearlyDatum,
  BestExchangeDatum,
  FavoriteChartDatum,
  MostCoinDatum,
  RankBar,
  TransactionChartDatum,
  IncomeDatum,
  FavoriteDatum,
} from '../model/dashboardData';
import { SectionTitle } from './SectionTitle';
import { IncomeChart } from './charts/IncomeChart';
import { FavoriteChart } from './charts/favoriteChart';

type Props = {
  isWide: boolean;
  yearly : YearlyDatum[];
  yearlyLoading?: boolean;
  yearlyError?: unknown;
  onRefetchYearly?: () => void;
  income : IncomeDatum | null ;
  incomeLoading?: boolean;
  incomeError?: unknown;
  onRefetchIncome?: () => void;
  favorite : FavoriteDatum | null ;
  FavoriteLoading : boolean;
  favoriteError : unknown;
  refetchFavorite : () => void;
  transactions: TransactionChartDatum[];
  favorites: FavoriteChartDatum[];
  bestExchanges: BestExchangeDatum[];
  topHoldings: MostCoinDatum[];
  ranks: RankBar[];
};

type ChartLabelProps<TPayload> = LabelProps & {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  value?: number | string;
  payload?: TPayload;
};

const SplitSection = ({ isWide, children }: { isWide: boolean; children: ReactNode }) => {
  const nodes = Children.toArray(children);
  const first = nodes[0] ?? null;
  const second = nodes[1] ?? null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isWide ? 'row' : 'column',
        alignItems: 'stretch',
      }}
    >
      {first}
      <Divider
        orientation={isWide ? 'vertical' : 'horizontal'}
        flexItem
        sx={isWide ? undefined : { my: 0.5 }}
      />
      {second}
    </Box>
  );
};

const renderBubbleLabel = ({
  centerX,
  baseY,
  text,
  fill,
  width = 96,
  height = 32,
  pointer = 6,
  gap = 6,
  textFill = '#fff',
  fontSize = 14,
  fontWeight = 700,
}: {
  centerX: number;
  baseY: number;
  text: string;
  fill: string;
  width?: number;
  height?: number;
  pointer?: number;
  gap?: number;
  textFill?: string;
  fontSize?: number;
  fontWeight?: number;
}) => {
  const bubbleX = centerX - width / 2;
  const bubbleY = baseY - height - pointer - gap;
  const pointerPath = `M${centerX - 8},${bubbleY + height} L${centerX + 8},${bubbleY + height} L${centerX},${bubbleY + height + pointer} Z`;

  return (
    <g>
      <rect x={bubbleX} y={bubbleY} width={width} height={height} rx={10} fill={fill} />
      <path d={pointerPath} fill={fill} />
      <text
        x={centerX}
        y={bubbleY + height / 2 + 4}
        textAnchor="middle"
        fill={textFill}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {text}
      </text>
    </g>
  );
};

export const AnalysisPanel = ({
  isWide,
  yearly,
  yearlyLoading = false,
  yearlyError = null,
  onRefetchYearly,
  income,
  incomeLoading = false,
  incomeError = null,
  onRefetchIncome,
  favorite,
  FavoriteLoading = false,
  favoriteError = null,
  refetchFavorite,
  transactions,
  favorites,
  bestExchanges,
  topHoldings,
  ranks,
}: Props) => {

  const favoriteRate = useMemo(() => favorites[0]?.value ?? 0, [favorites]);
  const incomeLabelColors = useMemo(
    () => ['var(--Color-greyscale-800)', 'var(--Color-greyscale-000)'],
    [],
  );
  const hasIncome = income !== null;
  const hasFavorites = favorites.length > 0;
  const hasBestExchanges = bestExchanges.length > 0;
  const hasTopHoldings = topHoldings.length > 0;
  const hasRanks = ranks.length > 0;

  const renderIncomeLabel: ContentRenderer<ChartLabelProps<IncomeChartDatum>> = useCallback((props: { x: any; y: any; width: any; payload: any; }) => {
    const { x, y, width, payload } = props;
    if (!payload?.showLabel || x == null || y == null || width == null) return null;

    return renderBubbleLabel({
      centerX: x + width / 2,
      baseY: y,
      text: payload.label,
      fill: 'var(--Color-greyscale-500)',
    });
  }, []);

  const renderIncomeValueLabel: ContentRenderer<ChartLabelProps<IncomeChartDatum>> = useCallback(
    (props: { x: any; y: any; width: any; value: any; payload: any; index: any; }) => {
      const { x, y, width, value, payload, index } = props;
      if (payload?.showLabel || x == null || y == null || width == null) return null;

      const safeIndex = typeof index === 'number' ? index : 0;
      const color = incomeLabelColors[safeIndex % incomeLabelColors.length] || 'var(--Color-greyscale-800)';
      const displayValue = Array.isArray(value) ? value.join(',') : value;
      const displayText = displayValue ?? 0;

      return (
        <text
          x={x + width / 2}
          y={y + 16}
          textAnchor="middle"
          fill={color}
          fontSize={15}
          fontWeight={600}
        >
          {`${displayText}만원`}
        </text>
      );
    },
    [incomeLabelColors],
  );

  const renderBestExchangeLabel: ContentRenderer<ChartLabelProps<BestExchangeDatum>> = useCallback((props: { x: any; y: any; width: any; payload: any; }) => {
    const { x, y, width, payload } = props;
    if (!payload || x == null || y == null || width == null) return null;

    const centerX = x + width / 2;
    const labelText = payload.label ?? '';

    if (payload?.showBubble) {
      return renderBubbleLabel({
        centerX,
        baseY: y,
        text: labelText,
        fill: 'var(--Color-greyscale-700)',
        width: 110,
        gap: 8,
      });
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
        <TransactionsChart
          yearly={yearly}
          isLoading={yearlyLoading}
          error={yearlyError}
          onRetry={onRefetchYearly}
        />
        <Divider />
        <IncomeChart
          income={income}
          isLoading={incomeLoading}
          error={incomeError}
          onRetry={onRefetchIncome}
        />
        <Divider />
        <FavoriteChart
          data={favorite}
          isLoading={FavoriteLoading}
          error={favoriteError}
          onRetry={refetchFavorite}
        />
        <Divider />
        <SplitSection isWide={isWide}>
          <ChartCard id="favorit-chart">
            <TextBlock title="바이낸스" desc="내 최애 거래소는?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              전체 거래 중 {favoriteRate}%
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {hasFavorites ? (
                <Box sx={{ position: 'relative', maxWidth: FAVORITE_CHART_WIDTH, width: '100%', height: 280, mt: 3 }}>
                  <ChartContainer height={280}>
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
                        isAnimationActive={false}
                      />
                    </RadialBarChart>
                  </ChartContainer>
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
              ) : (
                <Typography sx={{ mt: 3 }} color="var(--Color-greyscale-600)">
                  즐겨찾기 거래소 데이터가 없습니다.
                </Typography>
              )}
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
            {hasBestExchanges ? (
              <ChartContainer height={320} sx={{ mt: 3 }}>
                <BarChart data={bestExchanges} margin={{ ...BAR_CHART_MARGIN, left: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="var(--Color-greyscale-300)" />
                  <XAxis dataKey="name" tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <ReferenceLine y={0} stroke="var(--Color-greyscale-400)" strokeDasharray="6 6" />
                  <Tooltip cursor={false} />
                  <Bar
                    dataKey="value"
                    radius={[14, 14, 0, 0]}
                    barSize={DEFAULT_BAR_SIZE}
                    label={renderBestExchangeLabel}
                    isAnimationActive={false}
                  >
                    {bestExchanges.map((entry) => (
                      <Cell key={entry.name} fill={entry.barColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            ) : (
              <Typography sx={{ mt: 3 }} color="var(--Color-greyscale-600)">
                거래소 소득 데이터가 없습니다.
              </Typography>
            )}
          </ChartCard>
          <ChartCard id="most-coin-chart">
            <TextBlock title="이더리움" desc="지금, 가장 많이 보유한 자산은?" size="lg" titleFirst={false} />
            <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
              전체 자산 중 {topHoldings[0]?.value ?? 0}%
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {hasTopHoldings ? (
                <>
                  <ChartContainer height={240} sx={{ position: 'relative' }}>
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
                  </ChartContainer>
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
                </>
              ) : (
                <Typography color="var(--Color-greyscale-600)">보유 자산 데이터가 없습니다.</Typography>
              )}
            </Box>
          </ChartCard>
        </SplitSection>
        <Divider />
        <ChartCard id="rank-chart">
          <TextBlock title="상위 0.02%" desc="내 자산 순위는?" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            최상위 고액 자산가예요
          </Typography>
          <Box sx={{ position: 'relative', height: 403, mt: 3, px: 2 }}>
            {hasRanks ? (
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
                      borderRadius: '14px 0 0 14px',
                      background: bar.highlight ? 'var(--Color-greyscale-800)' : 'var(--Color-greyscale-300)',
                    }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography color="var(--Color-greyscale-600)">순위 데이터가 없습니다.</Typography>
            )}
          </Box>
        </ChartCard>
      </Box>
    </Box>
  );
};
