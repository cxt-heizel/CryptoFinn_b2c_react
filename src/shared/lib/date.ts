import dayjs from 'dayjs';

type DateInput = Parameters<typeof dayjs>[0];

export const formatDate = (value?: DateInput, format = 'YYYY-MM-DD') => {
  if (!value) return '-';
  return dayjs(value).format(format);
};
