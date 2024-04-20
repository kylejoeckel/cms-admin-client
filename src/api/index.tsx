import { FormData } from "../template/a/interfaces";

export const fetchSiteData = async (organizationId: string) => {
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

export const updateSiteData = async (
  organizationId: string,
  formData: FormData
) => {
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

export const fetchPdfFiles = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_ASSET_API_URL}/list-menu-assets?groupName=${process.env.REACT_APP_GROUP_NAME}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
