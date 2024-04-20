import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import StyledContainer from "../StyledCard";
import { debounce } from "lodash"; // Import debounce from lodash
import { IconButton, Typography } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface CollapsibleStyleProps {
  isOpen: boolean;
}

const CollapsibleHeading = styled("div")<CollapsibleStyleProps>(
  ({ isOpen }) => ({
    fontWeight: "bold",
    marginBottom: isOpen ? "0.5rem" : "0",
  })
);

const CollapsibleContent = styled("div")<CollapsibleStyleProps>(
  ({ isOpen }) => ({
    display: isOpen ? "block" : "none",
  })
);

interface ContainerTemplateProps {
  title: string;
  buttonContent?: React.ReactNode;
  children: React.ReactNode;
}

const ContainerTemplate: React.FC<ContainerTemplateProps> = ({
  title,
  buttonContent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null); // Create a ref for the container

  const toggleIsOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleResize = debounce(() => {
      console.log("Container resized");
      // You can place logic here if you need to adjust anything on resize
    }, 300); // Debounce resize events every 300ms

    const resizeObserver = new ResizeObserver((entries) => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect(); // Cleanup the observer on component unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount only

  return (
    <StyledContainer ref={containerRef}>
      <CollapsibleHeading isOpen={isOpen}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton
              size="small"
              onClick={toggleIsOpen}
              sx={{ marginLeft: "12px" }}
            >
              {isOpen ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </IconButton>
          </div>
          {buttonContent}
        </div>
      </CollapsibleHeading>
      <CollapsibleContent isOpen={isOpen}>{children}</CollapsibleContent>
    </StyledContainer>
  );
};

export default ContainerTemplate;
