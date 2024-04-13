import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

export const StyledContainer = styled(Card)({
  border: "solid 0.5px lightgrey",
  padding: "1rem",
  margin: "0.5rem",
  borderRadius: "0.5rem",
  // boxShadow: "none",
});

export const StyledCard = styled(Card)({
  border: "solid 1px lightgrey",
  padding: "0.5rem",
  marginTop: "0.25rem",
  borderRadius: "0.1rem",
  boxShadow: "none",
});
export default StyledContainer;
