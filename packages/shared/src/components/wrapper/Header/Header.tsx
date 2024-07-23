import React from "react";
import { Box, useTheme } from "@mui/material";
import s from "./Header.module.scss";
import { useSelector } from 'react-redux'
import { navbarWidthSelectort } from "../../../state/reducers/componentsProperties/selectors";
import logo from "../img/Logo (2).svg";
import { UserLogo } from "../../Logo/UserLogo";

export const Header = () => {
  const navbarWidth = useSelector(navbarWidthSelectort);
  const { breakpoints } = useTheme()

  return (
    <>
      <Box
        className={s.header}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          position: "fixed",
          right: "0",
          [breakpoints.down(1200)]: {
            width: '100%',
            padding: '0px 10px 0px 10px',
          },
          [breakpoints.up(1200)]: {
            padding: '0px 30px 0px 30px',
            width: `calc(100% - ${navbarWidth} - 21px)`,
          },
          height: "60px",
          background: "white",
        }}
      >
        <Box>
          <Box sx={{
            [breakpoints.up(1200)]: {
              display: 'none'
            },
          }}>
            <img src={logo} alt="" />
          </Box>
          <Box sx={{
            [breakpoints.down(1200)]: {
              display: 'none'
            },
          }}> <h3>Dictionary</h3></Box>
        </Box>
        <UserLogo />
      </Box>
    </>
  );
};
