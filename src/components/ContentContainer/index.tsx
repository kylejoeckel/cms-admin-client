import { Remove, Add } from "@mui/icons-material";
import { Typography, Grid, IconButton } from "@mui/material";
import useSiteDataStore from "../../store/useSiteDataStore";
import { ContentItem } from "../../template/a/interfaces";
import ContentCard from "../ContentCard";
import StyledContainer from "../StyledCard";
import { useEffect, useState } from "react";

const ContentContainer: React.FC = () => {
  const { formData, setFormData } = useSiteDataStore();
  const [content, setContent] = useState<ContentItem[]>(
    formData?.content || []
  );
  useEffect(() => {
    if (formData?.content) {
      setContent(formData.content);
    }
  }, [formData.content]);
  return (
    <StyledContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Content Section</Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            id="RemoveContentButton"
            color="warning"
            style={{ marginRight: "1rem" }}
            onClick={() => {
              setFormData({
                ...formData,
                content: content?.slice(0, -1),
              });
            }}
          >
            <Remove />
          </IconButton>
          <IconButton
            id="AddContentButton"
            color="primary"
            onClick={() => {
              setFormData({
                ...formData,
                content: [
                  content,
                  {
                    title: "",
                    content: "",
                    contentImg: "",
                    ctaList: [{ cta: "", ctaLink: "", ctaDownload: false }],
                  },
                ],
              });
            }}
          >
            <Add />
          </IconButton>
        </div>
      </div>
      <Grid container spacing={2}>
        {content?.map((content: ContentItem, index: number) => (
          <Grid item xs={12} sm={6} key={index}>
            <ContentCard contentData={content} index={index} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default ContentContainer;
