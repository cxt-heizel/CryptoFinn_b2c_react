import { CSSObject, Theme, styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Tooltip,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { ReactElement, ReactNode, cloneElement, isValidElement, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';

import { useLoginInfoQuery } from '../../features/auth/hooks/useLoginInfoQuery';
import { ItemBlock } from './ItemBlock';
import { TextBlock } from './TextBlock';

export type AppMenuItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

export type AppMenuSection = {
  id: string;
  items: AppMenuItem[];
};
export type UtilMenuSection = {
  id: string;
  items: AppMenuItem[];
};

interface Props {
  sections?: AppMenuSection[];
  utilsections?: UtilMenuSection[];
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (nextOpen: boolean) => void;
}

const drawerWidth = 296;
const collapsedDrawerWidth = 92;

const createDrawerTransition = (theme: Theme) =>
  theme.transitions.create(['transform', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  });

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: createDrawerTransition(theme),
  overflowX: 'hidden',
  transform: 'translateZ(0)',
  willChange: 'transform, width',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: createDrawerTransition(theme),
  overflowX: 'hidden',
  width: collapsedDrawerWidth,
  transform: 'translateZ(0)',
  willChange: 'transform, width',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  height: '100%',
  ...(open
    ? {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': { ...openedMixin(theme), position: 'relative', height: '100%', borderRight: 'none', },
      }
    : {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': { ...closedMixin(theme), position: 'relative', height: '100%', borderRight: 'none', },
      }),
}));

const createItemButtonSx = (open: boolean) => (theme: Theme) => ({
  borderRadius: 1,
  minHeight: 60,
  gap: open ? 1 : 0,
  transform: 'translateZ(0)',
  willChange: 'transform, background-color',
  transition: theme.transitions.create(['background-color', 'transform'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
});

const createItemIconSx = (open: boolean) => (theme: Theme) => ({
  position:'relative',
  minWidth: 0,
  maxWidth: 24,
  justifyContent: 'center',
  mr: open ? 0.75 : 0,
  transform: open ? 'translateX(0px) translateY(0px)' : 'translateX(4px) translateY(-10px)',
  willChange: 'transform',
  transition: theme.transitions.create(['transform', 'mr'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
});




const createUtilityButtonSx = (open: boolean) => (theme: Theme) => ({
  ...createItemButtonSx(open)(theme),
  minHeight: 44,
  height: 44,

});

const createUtilItemIconSx = (open: boolean) => (theme: Theme) => ({
  position:'relative',
  minWidth: 0,
  maxWidth: 24,
  justifyContent: 'center',
  mr: open ? 0.75 : 0,
  transform: open ? 'translateX(0px)' : 'translateX(4px)',
  willChange: 'transform',
  transition: theme.transitions.create(['transform', 'mr'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
});

const createItemTextSx = (open: boolean) => (theme: Theme) => ({
  flexGrow: open ? 1 : 0,
  minWidth: 0,
  opacity: open ? 1 : 0,
  maxWidth: open ? '100%' : 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  transform: open ? 'translateX(0)' : 'translateX(-8px)',
  willChange: 'transform, opacity',
  transition: [
    theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    theme.transitions.create(['opacity', 'max-width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: open ? 0 : theme.transitions.duration.shorter,
    }),
  ].join(', '),
});

const defaultSections: AppMenuSection[] = [
  {
    id: 'primary',
    items: [
      { key: 'inbox', label: 'Inbox', icon: <InboxIcon /> },
      { key: 'starred', label: 'Starred', icon: <MailIcon /> },
      { key: 'send', label: 'Send email', icon: <InboxIcon /> },
      { key: 'drafts', label: 'Drafts', icon: <MailIcon /> },
    ],
  },
  {
    id: 'secondary',
    items: [
      { key: 'all', label: 'All mail', icon: <InboxIcon /> },
      { key: 'trash', label: 'Trash', icon: <MailIcon /> },
      { key: 'spam', label: 'Spam', icon: <InboxIcon /> },
    ],
  },
];
const defaultUtilSections: UtilMenuSection[] = [
  {
    id: 'Utility',
    items: [
      {
        key: 'setting',
        label: '설정',
        icon: <SettingsIcon />,
        selected: location.pathname.startsWith('/setting'),
      },
      {
        key: 'logout',
        label: '로그아웃',
        icon: <LogoutIcon/>,
        selected: location.pathname.startsWith('/logout'),
      },
    ],
  },
];



export const AppMenu = ({ sections = defaultSections,utilsections = defaultUtilSections, open: openProp, defaultOpen = false, onToggle }: Props) => {
  
  const { data: loginInfo, isLoading: isLoginInfoLoading } = useLoginInfoQuery();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const theme = useTheme();
  const collapseDuration = theme.transitions.duration.standard;
  const [contentOpen, setContentOpen] = useState(open);
  const user = loginInfo?.user;
  
  useEffect(() => {
    let timer: number | undefined;
    if (open) {
      setContentOpen(true);
    } else if (contentOpen) {
      timer = window.setTimeout(() => setContentOpen(false), collapseDuration);
    } else {
      setContentOpen(false);
    }
    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [open, contentOpen, collapseDuration]);

  const handleToggle = () => {
    const next = !open;
    if (openProp === undefined) {
      setUncontrolledOpen(next);
    }
    onToggle?.(next);
  };

  const renderIcon = (icon: ReactNode) => {
    if (!icon) return null;
    if (isValidElement(icon)) {
      return cloneElement(icon as ReactElement, { fontSize: open ? 'medium' : 'small' });
    }
    return icon;
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Box sx={{ flex: 1, display:'flex', flexDirection:'column', px: 2, py: 3, gap: 1.5}}>
        <Box sx={{ px:1,py:'10px', minHeight: 72, position: 'relative'}}>
          <Box sx={{display: contentOpen ? 'flex' : 'none', opacity: open? 1:0 , position:'absolute', left: '8px', top: '21px'}}>
            {isLoginInfoLoading ? (
              <Skeleton variant="rounded" width={180} height={40} />
            ) : user ? (
              <TextBlock title={user.email} desc={user.signup_path} size='sm' />
            ) : null}
          </Box>
          <Box sx={{
            position:'absolute', 
            right:'8px',
            top: '16px', 
            transform: open ? 'translateX(0px)':'translateX(-3px)',
          }}>
            <IconButton onClick={handleToggle} size="medium" sx={{
              borderRadius:1, 
              bgcolor: contentOpen ? '#fff' : '#F2F4F6' , 
              }}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flexGrow:1 ,display:'flex', flexDirection:'column', justifyContent: 'space-between', alignItems:'center', }}>
          <Box sx={{width:'100%', position:'relative'}}>      
            {sections.map((section, index) => (
              <Box key={section.id}>
                <List sx={{p:0}}>
                  {section.items.map((item) => (
                    <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        selected={item.selected}
                        onClick={item.onClick}
                        sx={createItemButtonSx(contentOpen)}
                      >
                        {item.icon ? (
                          <ListItemIcon
                            sx={createItemIconSx(open)}
                          >
                            {renderIcon(item.icon)}
                          </ListItemIcon>
                        ) : null}
                        <ListItemText
                          primary={item.label}
                          sx={{
                            position: 'absolute',
                            left:52,
                          }}
                          primaryTypographyProps={{
                            sx: {
                              opacity: open ? 1:0,
                              display: contentOpen ? 'block':'none',
                              fontSize: 14,
                              fontWeight: 600,
                              color: item.selected ? '#6D7582' : '#505866',
                              lineHeight:'normal',
                              transition: theme.transitions.create(['opacity'], {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.shorter,
                              }),
                            },
                          }}
                        />
                        <ListItemText
                          primary={item.label}
                          sx={{
                            position: 'absolute',
                            bottom: '6px',
                            left:0,
                            width: '100%',
                            maxWidth: 60
                          }}
                          primaryTypographyProps={{
                            sx: {
                              opacity: open ? 0:1,
                              display: open ? 'none':'block',
                              fontSize: 11,
                              fontWeight: 600,
                              textAlign:'center',
                              color: item.selected ? '#6D7582' : '#A8AFB7',
                              lineHeight: 'normal',
                              transition: theme.transitions.create(['opacity'], {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.shorter,
                              }),
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {index < sections.length - 1 ? <Divider sx={{my:1.5}} /> : null}
              </Box>
            ))}
          </Box>
          <Box sx={{width:'100%', position:'relative'}}>      
          {utilsections.map((section) => (
            <Box key={section.id}>
              <List sx={{display:'grid',gap: '4px', p:0}}>
                {section.items.map((item) => (
                  <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      selected={item.selected}
                      onClick={item.onClick}
                      sx={createUtilityButtonSx(open)}
                    >
                      {item.icon ? (
                        <ListItemIcon
                          sx={createUtilItemIconSx(open)}
                        >
                          {renderIcon(item.icon)}
                        </ListItemIcon>
                      ) : null}
                      <ListItemText
                          primary={item.label}
                          sx={{
                            position: 'absolute',
                            left:52,
                          }}
                          primaryTypographyProps={{
                            sx: {
                              opacity: open ? 1:0,
                              display: contentOpen ? 'block':'none',
                              fontSize: 14,
                              fontWeight: 700,
                              color: item.selected ? '#6D7582' : '#A8AFB7',
                              lineHeight:'normal',
                              transition: theme.transitions.create(['opacity'], {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.shorter,
                              }),
                            },
                          }}
                        />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
