import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteData } from "../../hooks/useSiteData";
import { Typography } from "@mui/material";

interface SitePreviewPageProps {
  src?: string; // URL source for the iframe
  onBack?: () => void; // Function to call when the back button is clicked
}

const SitePreviewPageContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

const StyledIframe = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "none",
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  zIndex: 2,
}));

// Component definition with TypeScript annotations
const SitePreviewPage: React.FC<SitePreviewPageProps> = () => {
  const { siteData } = useSiteData();
  const route = useNavigate();
  const location = useLocation();
  return (
    <SitePreviewPageContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <BackButton
          onClick={() => route(location?.state?.from?.pathname || "/")}
          color="primary"
          aria-label="back"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.5rem",
            }}
          >
            <ArrowBack />
            Back
          </div>
        </BackButton>
        <Typography variant="h6">Site Preview</Typography>
        <div style={{ width: "46px" }} />
      </div>
      <StyledIframe
        src={"https://" + siteData?.domainName}
        allowFullScreen
        title="Full Screen Iframe"
      ></StyledIframe>
    </SitePreviewPageContainer>
  );
};

export default SitePreviewPage;
