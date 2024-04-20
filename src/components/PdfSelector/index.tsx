import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  LinearProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchPdfFiles } from "../../api";

interface PdfSelectorProps {
  setFile: (file: string, index: number) => void;
  selectedFile: string;
  index: number;
}

const usePdfFiles = (
  setPdfFiles: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return useQuery("pdfFiles", fetchPdfFiles, {
    // Options like refetching, caching etc., can be configured here
    onSuccess: (data) => {
      setPdfFiles(data);
      // Handle the successful data fetching here if needed, like updating a state
      // setPdfFiles(data); // This line should be handled within the query's success handling if needed, or managed via query data.
    },
    onError: (error) => {
      // Handle errors here
      console.error("Error fetching PDF files:", error);
    },
  });
};

const PdfSelector: React.FC<PdfSelectorProps> = ({
  setFile,
  selectedFile,
  index,
}) => {
  const [pdfFiles, setPdfFiles] = useState<string[]>([selectedFile]);
  const files = usePdfFiles(setPdfFiles);
  const handleSelectFileChange = (event: SelectChangeEvent<string>) => {
    setFile(event.target.value as string, index);
  };

  return !files.isLoading ? (
    <div>
      <FormControl fullWidth sx={{ marginTop: "16px", marginBottom: "8px" }}>
        <InputLabel id="pdf-select-label">Select Menu</InputLabel>
        <Select
          labelId="pdf-select-label"
          value={selectedFile}
          label="Select PDF"
          onChange={handleSelectFileChange}
        >
          {pdfFiles.map((file, index) => (
            <MenuItem key={index} value={file}>
              {file}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  ) : (
    <LinearProgress />
  );
};

export default PdfSelector;
