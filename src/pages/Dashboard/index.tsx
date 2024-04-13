import ContentCard from "../../components/ContentCard";
import { Button, Card, Grid, LinearProgress, Typography } from "@mui/material";
import FileUploader from "../../components/FileUploader";
import BasicInfoForm from "../../components/BasicInfoForm";
import { jwtDecode } from "jwt-decode";
import { ContentItem } from "../../template/a/interfaces";
import { useMobile } from "../../hooks/useMobile";
import { useSiteData } from "../../hooks/useSiteData";
import DashboardHeader from "../../components/DashboardHeader";
import { Add, Remove } from "@mui/icons-material";
import useSiteDataStore from "../../store/useSiteDataStore";
import SnackBar from "../../components/Snackbar";
import UploadContainer from "../../components/UploadContainer";
import ContentContainer from "../../components/ContentContainer";

const Dashboard = () => {
  const token = localStorage.getItem("auth-token");
  const decoded = jwtDecode(token || "");
  const organizationId =
    (decoded as { organization_id?: string }).organization_id || "";
  const { setFormData } = useSiteDataStore();
  const {
    handleSave,
    formData,
    isError,
    isLoading,
    saving,
    error,
    hasChanged,
    resetData,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar,
  } = useSiteData(organizationId);

  const mobile = useMobile();

  if (isError) {
    if ((error as any).message) {
      return <div>Error: {(error as any).message}</div>;
    } else {
      return <div>An unexpected error occurred.</div>;
    }
  }
  if (isLoading) return <LinearProgress />;
  return (
    <>
      <SnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
        type={"success"}
      />
      <DashboardHeader
        resetData={resetData}
        hasChanged={hasChanged}
        handleSave={handleSave}
        saving={saving}
      />
      <div
        style={{ display: "flex", flexDirection: mobile ? "column" : "row" }}
      >
        <div>
          <UploadContainer />
          <BasicInfoForm />
        </div>
        <div>
          <ContentContainer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
