import * as React from 'react';
import copy from 'clipboard-copy';
import { Link } from '@mui/docs/Link';
import { Portal } from '@mui/base/Portal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#0073E6" fill-rule="evenodd" d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z" clip-rule="evenodd"/></svg>`;

const logoWordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="115" height="37" fill="none"><path fill="#0073E6" d="M11.995 12.023.753 5.441A.5.5 0 0 0 0 5.872v16.779a1.5 1.5 0 0 0 .728 1.286l3.515 2.109a.5.5 0 0 0 .757-.43v-11.27a.2.2 0 0 1 .3-.173l6.7 3.86a1 1 0 0 0 1 0l6.7-3.862a.2.2 0 0 1 .3.173v6.096a1 1 0 0 1-.477.853l-6.284 3.856a.5.5 0 0 0-.239.426v5.637a.5.5 0 0 0 .25.432l8.74 5.06a1 1 0 0 0 1.015-.007l11.51-6.906a1 1 0 0 0 .485-.857v-11.05a.5.5 0 0 0-.757-.43l-3.758 2.255a1 1 0 0 0-.485.857v5.65a.5.5 0 0 1-.243.43l-6.786 4.072a1 1 0 0 1-.962.037L17.5 28.5l7.015-4.209a1 1 0 0 0 .485-.857V5.872a.5.5 0 0 0-.753-.431l-11.242 6.582a1 1 0 0 1-1.01 0Z"/><path fill="#0073E6" d="M35 5.883v5.55a1 1 0 0 1-.486.858l-3.757 2.255a.5.5 0 0 1-.757-.43v-5.55a1 1 0 0 1 .485-.857l3.758-2.255a.5.5 0 0 1 .757.43Z"/><path fill="#090B0B" d="M50.38 28V9.8h4.498l7.566 10.504-3.328-.026L66.708 9.8h4.446V28h-4.966v-5.018c0-1.49.035-2.86.104-4.108.07-1.265.208-2.54.416-3.822l.52 1.612-5.642 7.28H59.87l-5.616-7.358.572-1.534a34.34 34.34 0 0 1 .416 3.744c.07 1.248.104 2.643.104 4.186V28H50.38Zm34.881.156c-1.768 0-3.336-.347-4.706-1.04-1.352-.693-2.409-1.655-3.172-2.886-.745-1.23-1.118-2.626-1.118-4.186V9.8h5.2v10.088c0 .763.165 1.43.494 2.002a3.43 3.43 0 0 0 1.352 1.326c.572.312 1.222.468 1.95.468.763 0 1.44-.156 2.028-.468a3.347 3.347 0 0 0 1.404-1.326c.347-.572.52-1.24.52-2.002V9.8h5.044v10.244c0 1.56-.38 2.955-1.144 4.186-.745 1.23-1.794 2.193-3.146 2.886-1.334.693-2.903 1.04-4.706 1.04ZM99.672 28v-4.316h4.186v-9.568h-4.186V9.8h13.494v4.316h-4.16v9.568h4.16V28H99.672Z"/></svg>`;

interface MuiLogoMenuProps {
  marginLeft?: boolean;
  smallerMargin?: boolean;
}

export default function MuiLogoMenu({ smallerMargin, marginLeft }: MuiLogoMenuProps) {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 8,
            mouseY: event.clientY - 8,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopy = (svgSnippet: string) => {
    setCopied(true);
    copy(svgSnippet).then(() => {
      setTimeout(() => setCopied(false), 3500);
      handleClose();
    });
  };

  return (
    <React.Fragment>
      <Box
        component={Link}
        href="/"
        aria-label="Go to homepage"
        onContextMenu={handleContextMenu}
        sx={{
          '& > svg': { m: '0 !important' }, // override the 2px margin-left coming from the Link component
          mr: smallerMargin ? 1 : 1.5,
          ml: marginLeft ? 1.5 : undefined,
          cursor: 'default',
        }}
      >
        <SvgMuiLogomark height={28} width={28} />
      </Box>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
        sx={(theme) => ({
          '& .MuiMenuItem-root': {
            '& * path, .MuiSvgIcon-root': {
              fill: (theme.vars || theme).palette.text.tertiary,
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '&:hover, &:focus-visible': {
              '& * path, .MuiSvgIcon-root': {
                fill: (theme.vars || theme).palette.text.primary,
                color: (theme.vars || theme).palette.text.primary,
              },
            },
          },
        })}
      >
        <MenuItem onClick={() => handleCopy(logoSvg)}>
          <SvgMuiLogomark height={16} width={18} sx={{ mr: 1 }} />
          Copy logo as SVG
        </MenuItem>
        <MenuItem onClick={() => handleCopy(logoWordmarkSvg)}>
          <TextFieldsRoundedIcon sx={{ fontSize: '18px', mr: 1 }} />
          Copy wordmark as SVG
        </MenuItem>
      </Menu>
      <Portal container={() => document.body}>
        <Snackbar
          open={copied}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          TransitionComponent={Slide}
          message={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircleRoundedIcon sx={{ fontSize: '18px', color: 'success.main' }} />
              Logo SVG copied to clipboard!
            </Box>
          }
        />
      </Portal>
    </React.Fragment>
  );
}
