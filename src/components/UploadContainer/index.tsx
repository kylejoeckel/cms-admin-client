import { Typography } from "@mui/material";
import FileUploader from "../FileUploader";
import React from "react";
import StyledContainer, { StyledCard } from "../StyledCard";

const UploadContainer: React.FC = () => {
  return (
    <StyledContainer>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Asset Upload
      </Typography>
      <StyledCard>
        <FileUploader />
      </StyledCard>
    </StyledContainer>
  );
};

export default UploadContainer;
