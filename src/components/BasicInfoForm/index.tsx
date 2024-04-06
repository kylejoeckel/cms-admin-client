import React from 'react';
import { Card, Grid, TextField, Typography } from '@mui/material';
import PdfSelector from '../../components/PdfSelector';
import { FormData } from '../../pages/ContentForm';

// Define the prop types for the component
interface BasicInfoFormProps {
    formData: FormData; // Assuming FormData is the complete type for your form data
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setMenuRoute: (file: string, index: number) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, setFormData, setMenuRoute }) => {
    // Event handler for text field changes
    const handleChange = (field: keyof BasicInfoFormProps['formData']) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    // Event handler for PDF file selection
    const handleFileSelect = (file: string, index: number) => {
        setMenuRoute(file, index);
    };

    return (
        <Card sx={{ border: '1px solid lightgrey', padding: '1rem', margin: '1rem', borderRadius: '1rem' }}>
            <Typography variant="h5">Basic Info</Typography>
            <Card sx={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Full Name"
                            value={formData.fullName}
                            onChange={handleChange('fullName')}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            value={formData.address}
                            onChange={handleChange('address')}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <PdfSelector
                            index={-1}
                            setFile={handleFileSelect}
                            selectedFile={formData.menuRoute}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hours"
                            value={formData.hours}
                            onChange={handleChange('hours')}
                            fullWidth
                            disabled
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Domain Name"
                            value={formData.domainName}
                            onChange={handleChange('domainName')}
                            fullWidth
                            disabled
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </Card>
        </Card>
    );
};

export default BasicInfoForm;
