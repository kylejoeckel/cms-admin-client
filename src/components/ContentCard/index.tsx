import React, { useCallback } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import ImageSelector from "../ImageSelector";
import CTAList from "../CTAList";
import { ContentCardProps, CTA } from "../../template/a/interfaces";
import useSiteDataStore from "../../store/useSiteDataStore";
import { StyledCard } from "../StyledCard";
import { Add, Remove } from "@mui/icons-material";

const ContentCard: React.FC<ContentCardProps> = ({ contentData, index }) => {
  const { updateContentItem: updateData } = useSiteDataStore();
  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateData(index, "title", event.target.value);
    },
    [index, updateData]
  );

  const handleContentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateData(index, "content", event.target.value);
    },
    [index, updateData]
  );

  const handleImageChange = useCallback(
    (image: string) => {
      updateData(index, "contentImg", image);
    },
    [index, updateData]
  );



  return (
    <StyledCard>
      <TextField
        label="Title"
        value={contentData?.title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={contentData?.content}
        onChange={handleContentChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <ImageSelector
        label="Background Image"
        setImage={handleImageChange}
        currentImage={contentData?.contentImg || ""}
      />
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
          CTA Button
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            size="small"
            onClick={() =>
              updateData(index, "ctaList", contentData?.ctaList?.slice(0, -1))
            }
          >
            <Remove />
          </IconButton>
          <IconButton
            size="small"
            onClick={() =>
              updateData(index, "ctaList", [
                ...(contentData?.ctaList as CTA[]),
                { cta: "", ctaLink: "", ctaDownload: false },
              ])
            }
          >
            <Add />
          </IconButton>
        </div>
      </div>
      <CTAList ctaList={contentData?.ctaList || []} index={index} />
    </StyledCard>
  );
};

export default ContentCard;
