import { Remove, Add } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import useSiteDataStore from "../../store/useSiteDataStore";
import { ContentItem } from "../../template/a/interfaces";
import ContentCard from "../ContentCard";
import { useEffect, useState } from "react";
import ContainerTemplate from "../ContainerTemplate";

const ContentContainer: React.FC = () => {
  const { siteData, setFormData } = useSiteDataStore();
  const [content, setContent] = useState<ContentItem[]>(
    siteData?.content || []
  );
  useEffect(() => {
    if (siteData?.content) {
      setContent(siteData.content);
    }
  }, [siteData.content]);
  return (
    <ContainerTemplate
      title="Content Section"
      buttonContent={
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            id="RemoveContentButton"
            size="small"
            color="warning"
            style={{ marginRight: "1rem" }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setFormData({
                ...siteData,
                content: content?.slice(0, -1),
              });
            }}
          >
            <Remove />
          </IconButton>
          <IconButton
            size="small"
            id="AddContentButton"
            color="primary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setFormData({
                ...siteData,
                content: [
                  ...(siteData?.content ?? []),
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
      }
    >
      <Grid container spacing={2}>
        {content?.map((content: ContentItem, index: number) => (
          <Grid item xs={12} sm={6} key={index}>
            <ContentCard contentData={content} index={index} />
          </Grid>
        ))}
      </Grid>
    </ContainerTemplate>
  );
};

export default ContentContainer;
