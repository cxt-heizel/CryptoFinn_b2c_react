import * as React from 'react';
import { Button, ButtonProps, Menu, MenuItem, useTheme } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

export type AppDropdownMenuButtonOption = {
  label: string;
  value: string;
};

type AppDropdownMenuButtonProps = {
  options: AppDropdownMenuButtonOption[];
  onSelect: (option: AppDropdownMenuButtonOption) => Promise<void> | void;
  defaultLabel?: string;
  buttonProps?: ButtonProps;
  disabled?: boolean;
};

/**
 * 공용 드롭다운 메뉴 버튼.
 * - 클릭 시 Menu를 띄우고, 옵션 선택 후 onSelect를 실행한 뒤 라벨을 초기화.
 * - 메뉴 폭을 버튼 폭과 맞춰 UI 흔들림을 방지.
 */
export const AppDropdownMenuButton: React.FC<AppDropdownMenuButtonProps> = ({
  options,
  onSelect,
  defaultLabel = '선택',
  buttonProps,
  disabled,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [label, setLabel] = React.useState(defaultLabel);
  const [computedWidth, setComputedWidth] = React.useState<number>();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const menuListRef = React.useRef<HTMLUListElement | null>(null);
  const menuId = React.useId();
  const theme = useTheme();

  React.useEffect(() => {
    setLabel(defaultLabel);
  }, [defaultLabel]);

  const isMenuOpen = Boolean(menuAnchor);

  // 1) 텍스트 길이 기반 선제 폭 계산 (메뉴 열기 전에도 적용)
  React.useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return;

    const labels = [defaultLabel, ...options.map(o => o.label)];
    const fontWeight = theme.typography?.button?.fontWeight ?? 500;
    const fontSizeRaw = theme.typography?.button?.fontSize ?? '0.875rem';
    const fontFamily = theme.typography?.button?.fontFamily ?? 'inherit';
    const fontSize =
      typeof fontSizeRaw === 'number' ? `${fontSizeRaw}px` : fontSizeRaw;

    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const textWidth = Math.max(...labels.map(label => ctx.measureText(label).width));

    const paddingXRaw =
      typeof theme.spacing === 'function' ? theme.spacing(3) : 24;
    const paddingX =
      typeof paddingXRaw === 'number' ? paddingXRaw : parseFloat(paddingXRaw);
    const iconSpace = 20; // 드롭다운 아이콘 영역
    const minWidth = textWidth + paddingX + iconSpace;

    setComputedWidth(prev => {
      if (prev === undefined || minWidth > prev) return minWidth;
      return prev;
    });
  }, [defaultLabel, options, theme]);

  React.useEffect(() => {
    const buttonWidth = buttonRef.current?.getBoundingClientRect().width ?? 0;
    const listWidth = menuListRef.current?.getBoundingClientRect().width ?? 0;
    const nextWidth = Math.max(buttonWidth, listWidth);
    if (nextWidth && nextWidth !== computedWidth) {
      setComputedWidth(nextWidth);
    }
  }, [isMenuOpen, options, defaultLabel, computedWidth]);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => setMenuAnchor(null);

  const handleSelect = async (option: AppDropdownMenuButtonOption) => {
    setLabel(option.label);
    setMenuAnchor(null);
    setIsProcessing(true);
    try {
      await onSelect(option);
    } finally {
      setIsProcessing(false);
      setLabel(defaultLabel);
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        ref={buttonRef}
        variant={buttonProps?.variant ?? 'outlined'}
        size={buttonProps?.size ?? 'small'}
        onClick={openMenu}
        disabled={disabled || isProcessing || buttonProps?.disabled}
        aria-controls={isMenuOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        sx={[
          { minWidth: computedWidth, justifyContent: 'space-between' },
          ...(buttonProps?.sx ? [buttonProps.sx] : []),
        ]}
        endIcon={
          isMenuOpen ? (
            <ExpandLessRoundedIcon fontSize="small" />
          ) : (
            <ExpandMoreRoundedIcon fontSize="small" />
          )
        }
      >
        {label}
      </Button>
      <Menu
        id={menuId}
        anchorEl={menuAnchor}
        open={isMenuOpen}
        onClose={closeMenu}
        keepMounted
        MenuListProps={{ ref: menuListRef }}
        PaperProps={{
          sx: {
            minWidth:
              computedWidth ??
              (buttonRef.current
                ? buttonRef.current.getBoundingClientRect().width
                : undefined),
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleSelect(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
