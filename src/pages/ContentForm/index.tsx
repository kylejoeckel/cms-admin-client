import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard";
import { Button, Card, Grid, Typography } from "@mui/material";
import FileUploader from "../../components/FileUploader";

export interface CTA {
  cta: string;
  ctaLink: string;
  ctaDownload: boolean;
}

export interface ContentItem {
  [key: string]: any; // Adding an index signature
  title: string;
  content: string;
  contentImg: string;
  ctaList: CTA[];
}

export interface FormData {
  fullName: string;
  hours: string;
  address: string;
  phone: string;
  lat: number;
  long: number;
  domainName: string;
  contactEmail: string;
  reservationLink: string;
  takeoutLink: string;
  noveltyLink: string;
  mainLogo: string;
  navLogo: string;
  heroImg: string;
  heroVideo: string;
  heroVideoPoster: string;
  content: ContentItem[];
}

const RestaurantForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    hours: "",
    address: "",
    phone: "",
    lat: 0,
    long: 0,
    domainName: "",
    contactEmail: "",
    reservationLink: "",
    takeoutLink: "",
    noveltyLink: "",
    mainLogo: "",
    navLogo: "",
    heroImg: "",
    heroVideo: "",
    heroVideoPoster: "",
    content: [
      {
        title: "",
        content: "",
        contentImg: "",
        ctaList: [{ cta: "", ctaLink: "", ctaDownload: false }],
      },
    ],
  });

  useEffect(() => {
    console.log(process.env.REACT_APP_SITE_DATA_URL, "URL");
    const fetchData = async () => {
      const response = await (
        await fetch(
          process.env.REACT_APP_SITE_DATA_URL +
          `/${process.env.REACT_APP_SITE_DATA_ID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }
        )
      ).json();
      setFormData(response?.siteData);
    };
    fetchData();
    console.log("formData");
  }, []);


  const saveFormData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SITE_DATA_URL}/${process.env.REACT_APP_SITE_DATA_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ siteData: formData }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      const result = await response.json();
      console.log("Data saved successfully:", result);
      // Optional: Show a success message or perform further actions
    } catch (error) {
      console.error("Error saving data:", error);
      // Optional: Show an error message
    }
  };


  const updateContentItem = <K extends keyof ContentItem, L extends keyof CTA>(
    index: number,
    parameterName: K | L,
    value: ContentItem[K] | CTA[L],
    ctaIndex?: number // Optional parameter to specify the index of the ctaItem to update
  ): void => {
    setFormData((prevFormData: FormData) => ({
      ...prevFormData, // Spread the previous formData to keep existing fields
      content: prevFormData.content.map(
        (contentItem, idx) =>
          idx === index // Check if this is the target content item
            ? ctaIndex !== undefined && parameterName in contentItem.ctaList[0] // Check if updating a ctaItem
              ? {
                ...contentItem,
                ctaList: contentItem.ctaList.map(
                  (ctaItem, ctaIdx) =>
                    ctaIdx === ctaIndex
                      ? { ...ctaItem, [parameterName]: value } // Update the specified cta parameter
                      : ctaItem // Leave other ctaItems unchanged
                ),
              }
              : { ...contentItem, [parameterName]: value } // Update the specified content parameter
            : contentItem // Leave other content items unchanged
      ),
    }));
  };

  return (
    <>
      <Card
        sx={{
          border: "solid 1px lightgrey",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h5">Asset Upload</Typography>
        <Card sx={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
          <FileUploader />
        </Card>
      </Card>
      <Card
        sx={{
          border: "solid 1px lightgrey",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h5">Content Section Editor</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={saveFormData}
          sx={{ margin: "1rem 0" }}
        >
          Save Changes
        </Button>
        <Grid container spacing={2}>
          {formData.content.map((content, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ContentCard
                contentData={content}
                updateData={updateContentItem}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default RestaurantForm;
