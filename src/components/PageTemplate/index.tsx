// PageTemplate.tsx
import React, { ReactNode } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Preview } from "@mui/icons-material";
import { useMobile } from "../../hooks/useMobile";

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  const router = useNavigate();
  const location = useLocation();
  const mobile = useMobile();
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", paddingBottom: "32px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MenuMatrix CMS
          </Typography>
          {location?.pathname !== "/login" && !mobile ? (
            <Button onClick={() => router("/preview")} color="inherit">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.5rem",
                }}
              >
                <Preview />
                Site Preview
              </div>
            </Button>
          ) : null}
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
