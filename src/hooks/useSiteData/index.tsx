import useSiteDataStore from "../../store/useSiteDataStore"; // Import the store
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { FormData } from "../../template/a/interfaces";
import { isEqual } from "lodash";

const fetchSiteData = async (organizationId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_SITE_DATA_URL}/${organizationId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const updateFormData = async (organizationId: string, formData: FormData) => {
  const response = await fetch(
    `${process.env.REACT_APP_SITE_DATA_URL}/${organizationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ siteData: formData }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to save data");
  }
  return response.json();
};
export const useSiteData = (organizationId: string) => {
  const { data, isError, error, isLoading } = useQuery(
    ["siteData", organizationId],
    () => fetchSiteData(organizationId)
  );
  const {
    setOriginalData,
    originalData,
    setFormData,
    formData,
    resetData,
    setContentData,
    setHeaderData,
  } = useSiteDataStore();
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
      setContentData(data.siteData.content);
      setHeaderData(data.siteData.header);
    }
  }, [data, setContentData, setFormData, setHeaderData, setOriginalData]);

  const mutation = useMutation(() => updateFormData(organizationId, formData), {
    onSuccess: (result) => {
      console.log("Data saved successfully:", result);
      setSnackbarMessage("Data saved successfully!");
      setSnackbarOpen(true);
      setOriginalData(formData);
    },
    onError: (err: any) => {
      console.log("An error occurred:", err.message);
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
