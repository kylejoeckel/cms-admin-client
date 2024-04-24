import useSiteDataStore from "../../store/useSiteDataStore"; // Import the store
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { isEqual } from "lodash";
import { fetchSiteData, fetchSiteTheme, updateSiteData } from "../../api";
import { jwtDecode } from "jwt-decode";

export const useSiteData = () => {
  const { setOriginalData, originalData, setFormData, siteData, resetData, setGroupName, groupName } =
    useSiteDataStore();
  const token = localStorage.getItem("auth-token");
  const decoded = jwtDecode(token || "");
  const organizationId =
    (decoded as { organization_id?: string }).organization_id || "";
  const { data, isError, error, isLoading } = useQuery(
    ["siteData", organizationId],
    () => fetchSiteData(organizationId)
  );
  const { data: themeData, isError: isThemeError, error: themeError, isLoading: isThemeLoading } = useQuery(
    ["siteTheme", groupName],
    () => fetchSiteTheme(groupName)
  );
  const [hasChanged, setHasChanged] = useState<boolean>(
    !isEqual(siteData, originalData)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setHasChanged(!isEqual(siteData, originalData));
  }, [siteData, originalData]);

  useEffect(() => {
    if (data && data.siteData && data.groupName) {
      setFormData(data.siteData);
      setGroupName(data.groupName)
      setOriginalData(data.siteData);
    }
  }, [data, setFormData, setOriginalData, setGroupName]);

  const mutation = useMutation(() => updateSiteData(organizationId, siteData), {
    onSuccess: (result) => {
      setOriginalData(siteData);
      setSnackbarMessage("Data saved successfully!");
      setSnackbarOpen(true);
    },
    onError: (err: any) => {
      setSnackbarMessage("An error occurred: " + err.message);
      setSnackbarOpen(true);
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return {
    hasChanged,
    siteData,
    handleSave: () => mutation.mutate(),
    saving: mutation.isLoading,
    isLoading: isLoading || isThemeLoading,
    isError: isError || isThemeError,
    error: error || themeError,
    resetData,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar,
    themeData: themeData[0]?.theme || {},
  };
};
