import React from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Typography,
} from "@mui/material";
import PdfSelector from "../PdfSelector";
import { CTA } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";

const CTAList: React.FC<{
  ctaList: CTA[];
  index: number | string;
}> = ({ ctaList, index }) => {
  const {
    updateContentItem: updateData,
    setFormData,
    formData,
  } = useSiteDataStore();
  const updateMenuOpts = (
    ctaIndex: number,
    menuIdx: number,
    key: string,
    value: string
  ) => {
    const newCTAList = [...ctaList];
    newCTAList[ctaIndex] = {
      ...newCTAList[ctaIndex],
      ctaMenuOpts: newCTAList[ctaIndex].ctaMenuOpts?.map((menu, idx) => {
        if (idx === menuIdx) {
          return {
            ...menu,
            [key]: value,
          };
        }
        return menu;
      }),
    };
    setFormData({
      ...formData,
      header: {
        ...formData.header,
        ctaList: newCTAList,
      },
    });
  };

  return (
    <>
      {ctaList.map((cta, idx) => (
        <div key={idx}>
          <TextField
            label="CTA"
            value={cta.cta}
            onChange={(e) => {
              updateData(index, "cta", e.target.value, idx);
            }}
            fullWidth
            margin="normal"
          />
          {cta.ctaMenuOpts ? (
            <>
              <Typography variant="subtitle2">Menu Options</Typography>
              {cta?.ctaMenuOpts?.map((menu, menuIdx) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "10px", paddingBottom: 0 }}
                  >
                    #{menuIdx + 1}
                  </Typography>
                  <TextField
                    key={menuIdx + menu?.title}
                    label="Title (Use proper casing!)"
                    fullWidth
                    value={menu.title}
                    onChange={(e) => {
                      updateMenuOpts(idx, menuIdx, "title", e.target.value);
                    }}
                  />
                  {menu?.download ? (
                    <PdfSelector
                      setFile={(file) =>
                        updateMenuOpts(idx, menuIdx, "link", file)
                      }
                      selectedFile={menu?.link || ""}
                      index={idx}
                    />
                  ) : (
                    <TextField
                      label="Enter Link (https://example.com) or (tel:123-456-7890)"
                      onChange={(event) =>
                        updateMenuOpts(idx, menuIdx, "link", event.target.value)
                      }
                      value={menu?.link || ""}
                      fullWidth
                      margin="normal"
                    />
                  )}
                </>
              ))}
            </>
          ) : (
            <FormControl component="fieldset">
              <FormLabel component="legend">Link/Menu</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(cta.ctaDownload)}
                      onChange={(event) => {
                        updateData(
                          index,
                          "ctaDownload",
                          event.target.checked,
                          idx
                        );
                      }}
                      name="ctaDownload"
                    />
                  }
                  label={Boolean(cta.ctaDownload) ? "Menu" : "Link"}
                />
              </FormGroup>
            </FormControl>
          )}
          {cta.ctaDownload && !cta.ctaMenuOpts ? (
            <PdfSelector
              setFile={(file) => updateData(index, "ctaLink", file, idx)}
              selectedFile={cta.ctaLink || ""}
              index={idx}
            />
          ) : (
            <TextField
              label="Enter Link (https://example.com) or (tel:123-456-7890)"
              onChange={(event) =>
                updateData(index, "ctaLink", event.target.value, idx)
              }
              value={cta.ctaLink}
              fullWidth
              margin="normal"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CTAList;
