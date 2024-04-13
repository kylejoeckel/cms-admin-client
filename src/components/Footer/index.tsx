import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for the footer
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  textAlign: "left",
  position: "fixed",
  bottom: 0,
  width: "100%",
}));

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <FooterContainer>
      <Typography variant="body1">
        &copy; {currentYear} Joeckel Media & Marketing
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
