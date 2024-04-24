import React, { useCallback, useState } from "react";
import { Grid, TextField, Button, useTheme } from "@mui/material";
import { SketchPicker } from "react-color";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MetaData } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import { StyledCard } from "../StyledCard";
import ImageSelector from "../ImageSelector";
import ContainerTemplate from "../ContainerTemplate";

interface ColorPickerDialogProps {
  colorPickerOpen: boolean;
  handleColorPickerClose: () => void;
  currentColor: string;
  handleColorChange: (color: { hex: string }) => void;
}

export const ColorPickerDialog: React.FC<ColorPickerDialogProps> = ({
  colorPickerOpen,
  handleColorPickerClose,
  currentColor,
  handleColorChange,
}) => (
  <Dialog open={colorPickerOpen} onClose={handleColorPickerClose}>
    <DialogTitle>Choose Theme Color</DialogTitle>
    <DialogContent>
      <SketchPicker color={currentColor} onChangeComplete={handleColorChange} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleColorPickerClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

interface MetadataTextFieldProps {
  label: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const MetadataTextField: React.FC<MetadataTextFieldProps> = ({
  label,
  value,
  onChange,
}) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
  />
);

const MetadataContainer: React.FC = () => {
  const { setFormData, siteData } = useSiteDataStore();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("");

  const handleColorPickerOpen = (color: string) => {
    setCurrentColor(color || "#ffffff"); // Default to white if no color is set
    setColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const handleColorChange = useCallback(
    (color: { hex: string }) => {
      setCurrentColor(color.hex);
      setFormData({
        ...siteData,
        metaData: {
          ...siteData.metaData,
          themeColor: color.hex,
        },
      });
    },
    [siteData, setFormData]
  );

  const handleChange =
    (field: keyof MetaData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...siteData,
        metaData: {
          ...siteData.metaData,
          [field]: event.target.value,
        },
      });
    };

  const theme = useTheme();

  return (
    <ContainerTemplate title="Meta Tags">
      <ColorPickerDialog
        colorPickerOpen={colorPickerOpen}
        currentColor={currentColor}
        handleColorPickerClose={handleColorPickerClose}
        handleColorChange={handleColorChange}
      />
      <StyledCard>
        <Grid container spacing={1}>
          {Object.entries({
            title: "Site Title",
            description: "Description",
            keywords: "Keywords (seperate values with ',')",
            appleMobileWebAppTitle: "Apple Mobile Web App Title",
            appleMobileWebStatusBarStyle: "Apple Mobile Web Status Bar Style",
            ogDescription: "Social Share Description",
            ogTitle: "Social Share Title",
            ogUrl: "Social Share URL",
            ogSiteName: "Social Share Site Name",
          }).map(([field, label]: [string, string]) =>
            siteData.metaData && siteData.metaData[field as keyof MetaData] ? (
              <Grid item xs={12} sm={6} key={field}>
                <MetadataTextField
                  label={label}
                  value={
                    siteData?.metaData
                      ? siteData?.metaData[field as keyof MetaData]
                      : ""
                  }
                  onChange={handleChange(field as keyof MetaData)}
                />
              </Grid>
            ) : (
              <></>
            )
          )}
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              onClick={() =>
                handleColorPickerOpen(siteData?.metaData?.themeColor || "")
              }
              style={{
                width: "100%",
                marginTop: "16px",
                height: "56px",
                color: "#fff",
                borderColor: theme.palette.primary.main,
                backgroundColor: siteData?.metaData?.themeColor,
              }}
            >
              Pick Theme Color
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageSelector
              currentImage={siteData?.metaData?.favicon || ""}
              label="Favicon (Tab Icon)"
              setImage={(image) =>
                handleChange("favicon")({
                  target: { value: image },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageSelector
              currentImage={siteData.metaData?.appleTouchIcon || ""}
              label="Apple Touch Icon"
              setImage={(image) =>
                handleChange("appleTouchIcon")({
                  target: { value: image },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageSelector
              currentImage={siteData.metaData?.ogImage || ""}
              label="Social Share Image"
              setImage={(image) =>
                handleChange("ogImage")({
                  target: { value: image },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Grid>
        </Grid>
      </StyledCard>
    </ContainerTemplate>
  );
};

export default MetadataContainer;
