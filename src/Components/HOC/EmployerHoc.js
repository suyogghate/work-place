import * as React from "react";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Box, Switch } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import WorkIcon from "@mui/icons-material/Work";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../assets/get-set-job-logo.png";
import { DarkmodeContext } from "../context/Darkmode";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const pages = [
  {
    label: "Profile",
    key: "profile",
    icon: <AccountBoxIcon />,
  },
  {
    label: "Jobs",
    key: "jobs",
    icon: <WorkIcon />,
  },
  {
    label: "Applicants",
    key: "applicants",
    icon: <BackupTableIcon />,
  },
  {
    label: "Conversation",
    key: "conversation",
    icon: <QuestionAnswerIcon />,
  },
];

function EmployerHoc({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, dispatch] = React.useContext(DarkmodeContext);
  // const [darkModeOn, toggleDarkMode] = React.useContext(DarkmodeContext);

  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const reRoute = (page) => {
    handleCloseNavMenu();
    navigate(`/employer/${page}`);
  };

  const logoutFun = () => {
    localStorage.clear();
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <AppBar position="fixed">
          <Container
            sx={{
              backgroundColor: state.darkMode ? "#282A3A" : "#fff",
            }}
            maxWidth="xl"
          >
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  style={{
                    width: "100px",
                    borderRadius: "50%",
                  }}
                  src={logo}
                  alt="logo"
                />
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.key} onClick={() => reRoute(page.key)}>
                      <Typography
                        sx={{
                          color: state.darkMode ? "#fff" : "#000",
                          variant: "contained",
                          // display: "block",
                          ":hover": {
                            bgcolor: "rgb(107, 154, 241)",
                            color: "white",
                            borderRadius: "5px",
                          },
                        }}
                        textAlign="center"
                      >
                        {page.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  style={{
                    width: "100px",
                    borderRadius: "50%",
                  }}
                  src={logo}
                  alt="logo"
                />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <MenuItem key={page.key} onClick={() => reRoute(page.key)}>
                    <Typography
                      sx={{
                        color: state.darkMode ? "#fff" : "#000",
                        variant: "contained",
                        // display: "block",
                        ":hover": {
                          bgcolor: "rgb(107, 154, 241)",
                          color: "white",
                          borderRadius: "5px",
                        },
                      }}
                      textAlign="center"
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={state.darkMode ? "LightsOff!" : "LightsOn!"}>
                  <Switch
                    checked={state.darkMode}
                    onChange={() => {
                      state.darkMode
                        ? dispatch({ type: "Make_light" })
                        : dispatch({ type: "Make_dark" });
                    }}
                  />
                </Tooltip>
                <Tooltip>
                  <Button
                    sx={{
                      backgroundColor: state.darkMode ? "transparent" : "#fff",
                      "&:hover": {
                        background: "grey",
                        color: "#000",
                        border: "1px solid #fff",
                        margin: "10px",
                      },
                    }}
                    onClick={logoutFun}
                  >
                    Logout
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                ></Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box
        display={{
          xs: "block",
          md: "none",
          position: "fixed",
          bottom: "0px",
          width: "100%",
          background: "white",
          zIndex: "2",
        }}
      >
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {pages.map((page) => {
              return (
                <BottomNavigationAction
                  key={page.key}
                  label={page.label}
                  onClick={() => reRoute(page.key)}
                  icon={page.icon}
                />
              );
            })}
          </BottomNavigation>
        </Box>
      </Box>
      {children}
    </>
  );
}

export default EmployerHoc;
