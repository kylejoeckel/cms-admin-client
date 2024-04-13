import React from "react";
import { Button, Typography } from "@mui/material";
import { Restore, Save } from "@mui/icons-material";

const DashboardHeader: React.FC<{
  saving: boolean;
  hasChanged: boolean;
  handleSave: () => void;
  resetData: () => void;
}> = ({ hasChanged, handleSave, resetData, saving }) => {
  return (
    <div
      style={{
        margin: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "solid 1px rgba(0,0,0,0.4)",
        marginBottom: "8px",
        padding: "8px 0 8px 0",
      }}
    >
      <Typography variant="h5">Editor</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          id="ResetButton"
          variant="contained"
          color="secondary"
          disabled={!hasChanged}
          sx={{ mr: 1 }}
          onClick={resetData}
        >
          <Restore />
        </Button>
        <Button
          id="SaveButton"
          variant="contained"
          color="primary"
          disabled={!hasChanged || saving}
          onClick={handleSave}
        >
          <Save />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
