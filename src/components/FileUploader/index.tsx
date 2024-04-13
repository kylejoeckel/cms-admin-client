import React, { useState } from 'react';
import { IconButton, } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';


const FileUploader: React.FC = () => {

    const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);

    const getSignedUrl = async (fileName: string): Promise<string> => {
        const response = await fetch(process.env.REACT_APP_ASSET_API_URL + `/add-asset-to-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupName: process.env.REACT_APP_GROUP_NAME,
                assetName: fileName,
            }),
        });
        const data = await response.json();
        return data.presignedUrl;
    };

    const uploadFile = async (file: File) => {
        const signedUrl = await getSignedUrl(file.name);
        console.log(signedUrl, 'signedUrl');

        // Use the file's type as the Content-Type
        const options = {
            method: 'PUT',
            headers: {
                // Dynamically set the Content-Type based on the file's MIME type
                'Content-Type': file.type || 'application/octet-stream', // Fallback to a binary stream if the type is not determined
            },
            body: file,
        };
        await fetch(signedUrl, options);
    };



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedUploadFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedUploadFile) {
            uploadFile(selectedUploadFile);
            setSelectedUploadFile(null);
        }
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
                <input type="file" accept="application/pdf, image/png, image/jpeg" onChange={handleFileChange} />
                <IconButton color='primary' type="submit"><CloudUpload /></IconButton>
            </form>
        </div >
    );
};

export default FileUploader;
