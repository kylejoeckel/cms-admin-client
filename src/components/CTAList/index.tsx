import React, { useEffect } from "react";
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
import CTAMenuOpts from "../CTAMenuOpts";


// TODO: finish refactoring so that it can be used inside headercontainer and contentcard
const CTAList: React.FC<{
  index: number | string;
}> = ({ index }) => {
  const [ctaList, setCtaList] = React.useState<CTA[]>([]);
  const { updateContentItem: updateData, siteData } = useSiteDataStore();
  useEffect(() => {
    if (index === "header") {
      setCtaList(siteData.header?.ctaList || []);
    } else if (typeof index === "number" && siteData.content) {
      setCtaList(siteData?.content[index]?.ctaList || []);
    }
  }, [siteData, index]);

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
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default CTAList;
