import BasicInfoContainer from "../../components/BasicInfoContainer";
import { useMobile } from "../../hooks/useMobile";
import { useSiteData } from "../../hooks/useSiteData";
import DashboardHeader from "../../components/DashboardHeader";
import SnackBar from "../../components/Snackbar";
import UploadContainer from "../../components/UploadContainer";
import ContentContainer from "../../components/ContentContainer";
import { LinearProgress } from "@mui/material";
import HeaderContainer from "../../components/HeaderContainer";
import MetadataContainer from "../../components/MetadataContainer";

const Dashboard = () => {
  const {
    handleSave,
    isError,
    isLoading,
    saving,
    error,
    hasChanged,
    resetData,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar,
  } = useSiteData();

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
          <BasicInfoContainer />
          <HeaderContainer />
        </div>
        <div>
          <ContentContainer />
          <MetadataContainer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
