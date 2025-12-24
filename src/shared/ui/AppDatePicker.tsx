import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

import { Box, Button } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { usePickerContext, useSplitFieldProps } from '@mui/x-date-pickers/hooks'; // v8 문서에 있는 훅 :contentReference[oaicite:1]{index=1}

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { AppButton } from './AppButton';


function ButtonField(props: PickerFieldProps<Dayjs>) {
  // 핵심: props 전체를 DOM에 뿌리면 경고/무시가 나서 동작이 깨질 수 있음.
  // forwardedProps만 Button에 넘기는 게 v8 권장 방식 :contentReference[oaicite:2]{index=2}
  const { forwardedProps } = useSplitFieldProps(props, 'date');
  const { setOpen, triggerRef, triggerStatus, value: pickerValue } = usePickerContext();
  // Strip props that should never reach the native button element.
  const { inputRef: _inputRef, slotProps: _slotProps, slots: _slots, ...buttonProps } = forwardedProps;

  // 버튼 텍스트는 “props.value(= Dayjs)”로 직접 포맷 (요구사항 2-1)
  const valueToFormat = props.value ?? pickerValue;
  const text =
    valueToFormat && dayjs(valueToFormat).isValid()
      ? dayjs(valueToFormat).locale('ko').format('YYYY년 M월 D일 (ddd)')
      : '날짜 선택';

  const handleButtonClick = () => {
    if (triggerStatus !== 'enabled') return;
    setOpen(prev => !prev);
  };

  return (
    <Button
      {...buttonProps}
      ref={triggerRef}
      onClick={handleButtonClick}
      disabled={triggerStatus !== 'enabled'}
      variant="outlined"
      sx={{ whiteSpace: 'nowrap', border:'none', px:1.5 }}
    >
      {text}
    </Button>
  );
}

export const AppDatePicker = () => {
  const [value, setValue] = React.useState<Dayjs>(dayjs());

  const today = dayjs();
  const isToday = value.isSame(today, 'day');

  const handlePrevDay = () => setValue(prev => prev.subtract(1, 'day'));
  const handleNextDay = () => {
    if (isToday) return;
    setValue(prev => prev.add(1, 'day'));
  };
  const handleToday = () => setValue(dayjs());

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <AppButton
        size="small"
        variant="outlined"
        sx={{ minWidth: 'unset', p: '1px' }}
        onClick={handlePrevDay}
      >
        <ChevronLeftIcon fontSize="small" />
      </AppButton>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          value={value}
          onChange={(newValue) => newValue && setValue(newValue)}
          // 포맷은 내부 파싱/placeholder에도 영향을 줘서 같이 두는 게 좋음
          format="YYYY년 M월 D일 (ddd)"
          slots={{ field: ButtonField }}   // 요구사항 2-2: 버튼 클릭 시 캘린더 오픈
        />
      </LocalizationProvider>

      <AppButton
        size="small"
        variant="outlined"
        sx={{ minWidth: 'unset', p: '1px' }}
        onClick={handleNextDay}
        disabled={isToday}
      >
        <ChevronRightIcon fontSize="small" />
      </AppButton>

      <AppButton
        sx={{ visibility: isToday ? 'hidden' : 'visible' }}
        onClick={handleToday}
        color="secondary"
        startIcon={<RefreshRoundedIcon />}
      >
        오늘로 돌아가기
      </AppButton>
    </Box>
  );
};
