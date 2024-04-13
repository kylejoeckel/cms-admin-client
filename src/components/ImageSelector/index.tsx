import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, LinearProgress } from '@mui/material';
import { useQuery } from "react-query";
interface ImageSelectorProps {
    label: string;
    currentImage: string;
    setImage: (image: string) => void;
}

const fetchImages = async (): Promise<string[]> => {
    const response = await fetch(process.env.REACT_APP_ASSET_API_URL + '/list-image-assets?groupName=' + process.env.REACT_APP_GROUP_NAME);
    const data = await response.json();
    return data as string[];
};


const ImageSelector: React.FC<ImageSelectorProps> = ({ label, currentImage, setImage }) => {

    const { data, isFetched } = useQuery("images", fetchImages)

    return (isFetched && data) ? (
        <div>
            <FormControl fullWidth>
                <InputLabel id="pdf-select-label">Select Image</InputLabel>
                <Select
                    labelId="pdf-select-label"
                    value={currentImage}
                    label={label}
                    onChange={(event) => setImage(event.target.value as string)}
                >
                    {data.map((file, index) => (
                        <MenuItem key={index} value={file}>{file}</MenuItem> // Update this line
                    ))}
                </Select>
            </FormControl>
        </div >
    ) : (<LinearProgress />);
};

export default ImageSelector;