import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface PdfSelectorProps {
    setFile: (file: string, index: number) => void;
    selectedFile: string;
    index: number
}

const PdfSelector: React.FC<PdfSelectorProps> = ({ setFile, selectedFile, index }) => {
    const [pdfFiles, setPdfFiles] = useState<string[]>([selectedFile]);

    const handleSelectFileChange = (event: SelectChangeEvent<string>) => {
        console.log(event)
        setFile(event.target.value as string, index);
    };

    useEffect(() => {
        const fetchPdfFiles = async () => {
            const response = await fetch(`${process.env.REACT_APP_ASSET_API_URL}/list-menu-assets?groupName=${process.env.REACT_APP_GROUP_NAME}`);
            const data = await response.json();
            setPdfFiles(data);
        };
        fetchPdfFiles();
    }, []);

    return (
        <div>
            <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '8px' }}>
                <InputLabel id="pdf-select-label">Select Menu</InputLabel>
                <Select
                    labelId="pdf-select-label"
                    value={selectedFile}
                    label="Select PDF"
                    onChange={handleSelectFileChange}
                >
                    {pdfFiles.map((file, index) => (
                        <MenuItem key={index} value={file}>{file}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default PdfSelector;
