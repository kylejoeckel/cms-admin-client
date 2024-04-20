import FileUploader from "../FileUploader";
import React from "react";
import { StyledCard } from "../StyledCard";
import ContainerTemplate from "../ContainerTemplate";

const UploadContainer: React.FC = () => {
  return (
    <ContainerTemplate title="Asset Upload">
      <StyledCard>
        <FileUploader />
      </StyledCard>
    </ContainerTemplate>
  );
};

export default UploadContainer;
