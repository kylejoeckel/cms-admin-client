// PageTemplate.tsx
import React, { ReactNode } from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import Footer from "../Footer";

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", paddingBottom: "32px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MenuMatrix CMS
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default PageTemplate;
