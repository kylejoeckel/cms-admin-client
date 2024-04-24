import React from "react";
import { Grid, TextField } from "@mui/material";
import { FormData } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import { StyledCard } from "../StyledCard";
import ContainerTemplate from "../ContainerTemplate";

const BasicInfoContainer: React.FC = () => {
  const { setFormData, siteData } = useSiteDataStore();
  // Event handler for text field changes
  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...siteData, [field]: event.target.value });
    };

  return (
    <ContainerTemplate title="Basic Info">
      <StyledCard>
        <Grid container>
          <TextField
            label="Full Name"
            value={siteData?.fullName}
            onChange={handleChange("fullName")}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Address"
            value={siteData?.address}
            onChange={handleChange("address")}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone Number"
            value={siteData?.phone}
            onChange={handleChange("phone")}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Hours"
            value={siteData?.hours}
            onChange={handleChange("hours")}
            fullWidth
            disabled
            margin="normal"
          />

          <TextField
            label="Domain Name"
            value={siteData?.domainName}
            onChange={handleChange("domainName")}
            fullWidth
            disabled
            margin="normal"
          />
        </Grid>
      </StyledCard>
    </ContainerTemplate>
  );
};

export default BasicInfoContainer;
