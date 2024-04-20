import useSiteDataStore from "../../store/useSiteDataStore"; // Import the store
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { isEqual } from "lodash";
import { fetchSiteData, updateSiteData } from "../../api";
import { jwtDecode } from "jwt-decode";

export const useSiteData = () => {
  const token = localStorage.getItem("auth-token");
  const decoded = jwtDecode(token || "");
  const organizationId =
    (decoded as { organization_id?: string }).organization_id || "";
  const { data, isError, error, isLoading } = useQuery(
    ["siteData", organizationId],
    () => fetchSiteData(organizationId)
  );
  const { setOriginalData, originalData, setFormData, formData, resetData } =
    useSiteDataStore();
  const [hasChanged, setHasChanged] = useState<boolean>(
    !isEqual(formData, originalData)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setHasChanged(!isEqual(formData, originalData));
  }, [formData, originalData]);

  useEffect(() => {
    if (data && data.siteData) {
      setFormData(data.siteData);
      setOriginalData(data.siteData);
    }
  }, [data, setFormData, setOriginalData]);

  const mutation = useMutation(() => updateSiteData(organizationId, formData), {
    onSuccess: (result) => {
      setOriginalData(formData);
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
    formData,
    handleSave: () => mutation.mutate(),
    saving: mutation.isLoading,
    isLoading,
    isError,
    error,
    resetData,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar,
  };
};
