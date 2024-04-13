import React from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import PdfSelector from "../PdfSelector";
import { CTA } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";

const CTAList: React.FC<{
  ctaList: CTA[];
  handleLinkChange: (link: string, idx: number) => void;
  index: number;
}> = ({ ctaList, handleLinkChange, index }) => {
  const { updateContentItem: updateData } = useSiteDataStore();
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
          {cta.ctaDownload ? (
            <PdfSelector
              setFile={(file) => handleLinkChange(file, idx)}
              selectedFile={cta.ctaLink}
              index={idx}
            />
          ) : (
            <TextField
              label="Enter Link (https://example.com)"
              onChange={(event) => handleLinkChange(event.target.value, idx)}
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
