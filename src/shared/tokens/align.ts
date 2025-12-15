export type Align = 'left' | 'center' | 'right';

export const flexAlign: Record<Align, 'flex-start' | 'center' | 'flex-end'> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const textAlign: Record<Align, 'left' | 'center' | 'right'> = {
  left: 'left',
  center: 'center',
  right: 'right',
};
