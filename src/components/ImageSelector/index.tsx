import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface ImageSelectorProps {
    label: string;
    currentImage: string;
    setImage: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, currentImage, setImage }) => {

    const [pdfFiles, setPdfFiles] = useState<string[]>([]);
    // const [selectedFile, setSelectedFile] = useState<string | null>(null);


    const handleSelectFileChange = (event: SelectChangeEvent<string>) => {
        console.log(event)
        setImage(event.target.value as string);
    };

    useEffect(() => {
        const fetchPdfFiles = async () => {
            // Replace this URL with your API endpoint that returns the list of PDF files
            const response = await fetch(process.env.REACT_APP_ASSET_API_URL + '/list-image-assets?groupName=' + process.env.REACT_APP_GROUP_NAME);
            const data = await response.json();
            setPdfFiles(data);
        };
        fetchPdfFiles();
    }, [])
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="pdf-select-label">Select Image</InputLabel>
                <Select
                    labelId="pdf-select-label"
                    value={currentImage}
                    label={label}
                    onChange={handleSelectFileChange}
                >
                    {pdfFiles.map((file, index) => (
                        <MenuItem key={index} value={file}>{file}</MenuItem> // Update this line
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ImageSelector;
