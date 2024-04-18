import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { HeaderData } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import StyledContainer, { StyledCard } from "../StyledCard";
import ImageSelector from "../ImageSelector";
import CTAList from "../CTAList";

const HeaderContainer: React.FC = () => {
  const { setFormData, formData } = useSiteDataStore();
  const [headerData, setHeaderData] = useState<HeaderData | undefined>(
    formData?.header
  );
  useEffect(() => {
    if (formData.header) {
      setHeaderData(formData.header);
    }
  }, [formData.header]);

  return (
    <StyledContainer>
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Header Content
      </Typography>
      <StyledCard>
        <Grid container>
          {headerData?.logoUrl && (
            <ImageSelector
              label="Header Logo"
              currentImage={headerData.logoUrl}
              setImage={(image) =>
                setFormData({
                  ...formData,
                  header: {
                    ...headerData,
                    logoUrl: image,
                  },
                })
              }
            />
          )}
          <hr style={{ marginTop: "12px", width: "100%" }} />
          {headerData?.ctaList && (
            <CTAList ctaList={headerData?.ctaList || []} index={"header"} />
          )}
        </Grid>
      </StyledCard>
    </StyledContainer>
  );
};

export default HeaderContainer;
