import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { HeaderData } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import { StyledCard } from "../StyledCard";
import ImageSelector from "../ImageSelector";
import PdfSelector from "../PdfSelector";
import CTAMenuOpts from "../CTAMenuOpts";
import ContainerTemplate from "../ContainerTemplate";

// TODO: abstractions needed to clean things up here
const HeaderContainer: React.FC = () => {
  const { setFormData, siteData } = useSiteDataStore();

  const setHeaderData = (data: HeaderData) => {
    setFormData({
      ...siteData,
      header: data,
    });
  };

  return (
    <ContainerTemplate title="Header Content">
      <StyledCard>
        <Grid container>
          {siteData?.header?.logoUrl && (
            <ImageSelector
              label="Header Logo"
              currentImage={siteData?.header.logoUrl}
              setImage={(image) =>
                setHeaderData({ ...siteData?.header, logoUrl: image })
              }
            />
          )}
          <hr style={{ marginTop: "12px", width: "100%" }} />
          {siteData?.header?.ctaList && (
            <>
              {siteData?.header.ctaList.map((cta, idx) => (
                <div key={idx}>
                  <TextField
                    label="CTA"
                    value={cta.cta}
                    onChange={(e) => {
                      setHeaderData({
                        ...siteData?.header,
                        ctaList: siteData?.header?.ctaList?.map((cta, ctaIdx) =>
                          ctaIdx === idx ? { ...cta, cta: e.target.value } : cta
                        ),
                      });
                    }}
                    fullWidth
                    margin="normal"
                  />
                  {cta.ctaMenuOpts ? (
                    <CTAMenuOpts menuOpts={cta.ctaMenuOpts} index={idx} />
                  ) : (
                    <>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Link/Menu</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={Boolean(cta.ctaDownload)}
                                onChange={(event) => {
                                  setHeaderData({
                                    ...siteData?.header,
                                    ctaList: siteData?.header?.ctaList?.map(
                                      (cta, ctaIdx) =>
                                        ctaIdx === idx
                                          ? {
                                              ...cta,
                                              ctaDownload: event.target.checked,
                                            }
                                          : cta
                                    ),
                                  });
                                }}
                                name="ctaDownload"
                              />
                            }
                            label={Boolean(cta.ctaDownload) ? "Menu" : "Link"}
                          />
                        </FormGroup>
                      </FormControl>
                      {cta.ctaDownload ? (
                        <PdfSelector
                          setFile={(file) =>
                            setHeaderData({
                              ...siteData?.header,
                              ctaList: siteData?.header?.ctaList?.map(
                                (cta, ctaIdx) =>
                                  ctaIdx === idx
                                    ? { ...cta, ctaLink: file }
                                    : cta
                              ),
                            })
                          }
                          selectedFile={cta.ctaLink || ""}
                          index={idx}
                        />
                      ) : (
                        <TextField
                          label="Enter Link (https://example.com) or (tel:123-456-7890)"
                          onChange={(event) =>
                            setHeaderData({
                              ...siteData?.header,
                              ctaList: siteData?.header?.ctaList?.map(
                                (cta, ctaIdx) =>
                                  ctaIdx === idx
                                    ? { ...cta, ctaLink: event.target.value }
                                    : cta
                              ),
                            })
                          }
                          value={cta.ctaLink}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </Grid>
      </StyledCard>
    </ContainerTemplate>
  );
};

export default HeaderContainer;
