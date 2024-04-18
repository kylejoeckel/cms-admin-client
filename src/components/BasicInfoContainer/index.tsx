import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import PdfSelector from "../PdfSelector";
import { FormData } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import StyledContainer, { StyledCard } from "../StyledCard";

const BasicInfoForm: React.FC = () => {
  const { setFormData, setMenuRoute, formData } = useSiteDataStore();
  // Event handler for text field changes
  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  // Event handler for PDF file selection
  const handleFileSelect = (file: string, index: number) => {
    setMenuRoute(file, index);
  };

  return (
    <StyledContainer>
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Basic Info
      </Typography>
      <StyledCard>
        <Grid container>
          <TextField
            label="Full Name"
            value={formData?.fullName}
            onChange={handleChange("fullName")}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Address"
            value={formData?.address}
            onChange={handleChange("address")}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone Number"
            value={formData?.phone}
            onChange={handleChange("phone")}
            fullWidth
            margin="normal"
          />

          <PdfSelector
            index={-1}
            setFile={handleFileSelect}
            selectedFile={formData?.menuRoute || ""}
          />

          <TextField
            label="Hours"
            value={formData?.hours}
            onChange={handleChange("hours")}
            fullWidth
            disabled
            margin="normal"
          />

          <TextField
            label="Domain Name"
            value={formData?.domainName}
            onChange={handleChange("domainName")}
            fullWidth
            disabled
            margin="normal"
          />
        </Grid>
      </StyledCard>
    </StyledContainer>
  );
};

export default BasicInfoForm;
