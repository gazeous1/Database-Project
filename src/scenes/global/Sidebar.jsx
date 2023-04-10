import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#515151",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        "& .pro-sidebar-inner": {
          background: `#ffffff !important`,
        },
        "& .pro-sidebar-inner": {
          background: `#ffffff !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          fontSize: "14px",
          fontWeight: "600",
        },
        "& .pro-inner-item:hover": {
          color: "#000000 !important",
          fontSize: "15px",
        },
        "& .pro-menu-item.active": {
          color: "#000000 !important",
        },
        "& .pro-sidebar": {
          color: " #888686 !important",
        },
        "& .pro-inner-item:hover .pro-icon-wrapper .pro-icon": {
          animation: "none !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[200],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontSize="20px"
                  fontWeight="bold"
                >
                  DATABASE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="30px" mt="45px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="90px"
                  height="90px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "15px 0 5px 0" }}
                >
                  Arsalan Ali
                </Typography>
                <Typography
                  variant="h7"
                  color={colors.primary[700]}
                  style={{ fontWeight: "600" }}
                >
                  2021-CS-155
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="Manage" icon={<ManageAccountsRoundedIcon />}>
              <Box>
                <Item
                  title="Students"
                  to="/students"
                  icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Advisors"
                  to="/advisor"
                  icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Projects"
                  to="/"
                  icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Evaluation"
                  to="/"
                  icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </SubMenu>
            <SubMenu title="Create" icon={<AddCircleRoundedIcon />}>
              <Item
                title="Groups"
                to="/"
                icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Assign Project"
                to="/"
                icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu title="Download" icon={<DownloadRoundedIcon />}>
              <Item
                title="Reports"
                to="/"
                icon={<CircleRoundedIcon sx={{ fontSize: 7 }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Settings"
              to="/"
              icon={<SettingsRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              to="/"
              icon={<LogoutRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
