import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          Resources <KeyboardArrowDownIcon />
        </Button>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>

                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {/* <MenuItem
                      onClick={() =>
                      window.open("https://novanetwork.io/verified-contracts")
                        }
                      style={{ fontSize: "10pt" }}
                      >Verified Contracts
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                      window.open("https://novanetwork.io/projects")
                        }
                      style={{ fontSize: "10pt" }}
                      >List of Projects
                    </MenuItem> */}

                    <MenuItem
                      onClick={() =>
                      window.open("https://faucet.novanetwork.io/")
                        }
                      style={{ fontSize: "10pt" }}
                      >Testnet Faucet
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                      window.open("https://docs.novanetwork.io/getting-started/wallet-setup")
                        }
                      style={{ fontSize: "10pt" }}
                      >Wallet Setup
                    </MenuItem>

                    <MenuItem
                      onClick={() =>
                      window.open("https://docs.novanetwork.io/")
                        }
                      style={{ fontSize: "10pt" }}
                      >Documentation
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
