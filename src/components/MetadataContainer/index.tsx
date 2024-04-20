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

const MetadataContainer: React.FC = () => {
  const { setFormData, formData } = useSiteDataStore();
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
        ...formData,
        metaData: {
          ...formData.metaData,
          themeColor: color.hex,
        },
      });
    },
    [formData, setFormData]
  );

  const handleChange =
    (field: keyof MetaData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        metaData: {
          ...formData.metaData,
          [field]: event.target.value,
        },
      });
    };

  const theme = useTheme();
  const ColorPickerDialog: React.FC = () => (
    <Dialog open={colorPickerOpen} onClose={handleColorPickerClose}>
      <DialogTitle>Choose Theme Color</DialogTitle>
      <DialogContent>
        <SketchPicker
          color={currentColor}
          onChangeComplete={handleColorChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleColorPickerClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ContainerTemplate title="Meta Tags">
      <ColorPickerDialog />
      <StyledCard>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Site Title"
              value={formData?.metaData?.title}
              onChange={handleChange("title")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              value={formData?.metaData?.description}
              onChange={handleChange("description")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Keywords"
              value={formData?.metaData?.keywords}
              onChange={handleChange("keywords")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              onClick={() =>
                handleColorPickerOpen(formData?.metaData?.themeColor || "")
              }
              style={{
                width: "100%",
                marginTop: "16px",
                height: "56px",
                color: "#fff",
                borderColor: theme.palette.primary.main,
                backgroundColor: formData?.metaData?.themeColor,
              }}
            >
              Pick Theme Color
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageSelector
              currentImage={formData?.metaData?.favicon || ""}
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
              currentImage={formData.metaData?.appleTouchIcon || ""}
              label="Apple Touch Icon"
              setImage={(image) =>
                handleChange("appleTouchIcon")({
                  target: { value: image },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Apple Mobile Web App Title"
              value={formData?.metaData?.appleMobileWebAppTitle}
              onChange={handleChange("appleMobileWebAppTitle")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Apple Mobile Web Status Bar Style"
              value={formData?.metaData?.appleMobileWebStatusBarStyle}
              onChange={handleChange("appleMobileWebStatusBarStyle")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageSelector
              currentImage={formData.metaData?.ogImage || ""}
              label="Social Share Image"
              setImage={(image) =>
                handleChange("ogImage")({
                  target: { value: image },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="OG Description"
              value={formData?.metaData?.ogDescription}
              onChange={handleChange("ogDescription")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="OG Title"
              value={formData?.metaData?.ogTitle}
              onChange={handleChange("ogTitle")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="OG URL"
              value={formData?.metaData?.ogUrl}
              onChange={handleChange("ogUrl")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="OG Site Name"
              value={formData?.metaData?.ogSiteName}
              onChange={handleChange("ogSiteName")}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </StyledCard>
    </ContainerTemplate>
  );
};

export default MetadataContainer;
