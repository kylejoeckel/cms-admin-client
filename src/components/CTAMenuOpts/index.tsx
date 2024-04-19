import { Typography, TextField } from "@mui/material";
import PdfSelector from "../PdfSelector";
import useSiteDataStore from "../../store/useSiteDataStore";
import { MenuOpts } from "../../template/a/interfaces";
import React from "react";

interface CTAMenuOptsProps {
  menuOpts: MenuOpts[];
  index: number;
}

const CTAMenuOpts = ({ menuOpts, index }: CTAMenuOptsProps) => {
  const { formData, setFormData } = useSiteDataStore();

  return (
    <>
      <Typography variant="subtitle2">Menu Options</Typography>
      {menuOpts?.map((menu, menuIdx) => (
        <div key={menuIdx}>
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "10px", paddingBottom: 0 }}
          >
            #{menuIdx + 1}
          </Typography>
          <TextField
            label="Title (Use proper casing!)"
            fullWidth
            value={menu.title}
            onChange={(e) => {
              setFormData({
                ...formData,
                header: {
                  ...formData?.header,
                  ctaList: formData?.header?.ctaList?.map((cta, ctaIdx) =>
                    ctaIdx === index
                      ? {
                          ...cta,
                          ctaMenuOpts: menuOpts?.map((menu, menuIdx2) =>
                            menuIdx === menuIdx2
                              ? {
                                  ...menu,
                                  title: e.target.value,
                                }
                              : menu
                          ),
                        }
                      : cta
                  ),
                },
              });
            }}
          />
          {menu?.download ? (
            <PdfSelector
              setFile={(file) =>
                setFormData({
                  ...formData,
                  header: {
                    ...formData?.header,
                    ctaList: formData?.header?.ctaList?.map((cta, ctaIdx) =>
                      ctaIdx === index
                        ? {
                            ...cta,
                            ctaMenuOpts: menuOpts?.map((menu, menuIdx2) =>
                              menuIdx === menuIdx2
                                ? {
                                    ...menu,
                                    link: file,
                                  }
                                : menu
                            ),
                          }
                        : cta
                    ),
                  },
                })
              }
              selectedFile={menu?.link || ""}
              index={menuIdx}
            />
          ) : (
            <TextField
              label="Enter Link (https://example.com) or (tel:123-456-7890)"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  header: {
                    ...formData?.header,
                    ctaList: formData?.header?.ctaList?.map((cta, ctaIdx) =>
                      ctaIdx === index
                        ? {
                            ...cta,
                            ctaMenuOpts: menuOpts?.map((menu, menuIdx2) =>
                              menuIdx === menuIdx2
                                ? {
                                    ...menu,
                                    link: event.target.value,
                                  }
                                : menu
                            ),
                          }
                        : cta
                    ),
                  },
                })
              }
              value={menu?.link || ""}
              fullWidth
              margin="normal"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CTAMenuOpts;
