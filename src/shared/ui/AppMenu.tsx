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
  Tooltip,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { ReactElement, ReactNode, cloneElement, isValidElement, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 92,
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
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

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
        <Box sx={{ display:'flex', flexDirection:'column', alignItems: open ? 'flex-end':'center', px:1,py:'10px'}}>

          <Tooltip title={open ? '메뉴 접기' : '메뉴 펼치기'}>
            <IconButton onClick={handleToggle} size="medium" sx={{borderRadius:1, bgcolor: open ? '#fff' : '#F2F4F6' }}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
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
                        sx={{
                          borderRadius:1,
                          minHeight: 60,
                          display: open ? 'grid' : 'flex',
                          gridTemplateColumns: '24px 1fr',
                          justifyContent: open ? 'initial' : 'center',
                          flexDirection: open ? 'row' : 'column',
                          alignItems: 'center',
                          gap: open ? 2 : 'unset',
                        }}
                      >
                        {item.icon ? (
                          <ListItemIcon
                            sx={{
                              justifyContent: 'center',
                              minWidth: 'unset'
                            }}
                          >
                            {renderIcon(item.icon)}
                          </ListItemIcon>
                        ) : null}
                        <ListItemText
                          primary={item.label}
                          sx={{
                            display: 'flex',
                            textAlign: open ? 'left' : 'center',
                            // width: '100%',
                            justifyContent: open ? 'flex-start':'center',
                            alignItems: 'center'
                          }}
                          primaryTypographyProps={{
                            fontSize: open ? 14 : 11,
                            fontWeight: open ? 700 : 600,
                            color: item.selected ? '#6D7582' : open ? '#505866' : '#A8AFB7',
                            lineHeight:'normal'
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
          {utilsections.map((section, index) => (
            <Box key={section.id}>
              <List sx={{display:'grid',gap: '4px', p:0}}>
                {section.items.map((item) => (
                  <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      selected={item.selected}
                      onClick={item.onClick}
                      sx={{
                        borderRadius:1,
                        minHeight: 44,
                        height: 44,
                        display: open ? 'grid' : 'flex',
                        gridTemplateColumns: '24px 1fr',
                        justifyContent: open ? 'initial' : 'center',
                        flexDirection: open ? 'row' : 'column',
                        alignItems: 'center',
                        gap: open ? 2 : 'unset',
                      }}
                    >
                      {item.icon ? (
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                      ) : null}
                      <ListItemText
                        primary={item.label}
                        sx={{
                          display: open ? 'flex' : 'none',
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          opacity: open ? 1 :0,
                        }}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: item.selected ? '#6D7582' : open ? '#505866' : '#A8AFB7',
                          lineHeight:'normal'
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
