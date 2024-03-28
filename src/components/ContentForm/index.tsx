import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, InputLabel, FormControl, Typography, FormControlLabel, Checkbox } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface CTA {
    cta: string;
    ctaLink: string;
    ctaDownload: boolean;
}

interface ContentItem {
    [key: string]: any; // Adding an index signature
    title: string;
    content: string;
    contentImg: string;
    ctaList: CTA[];
}


interface FormData {
    fullName: string;
    hours: string;
    address: string;
    phone: string;
    lat: number;
    long: number;
    domainName: string;
    contactEmail: string;
    reservationLink: string;
    takeoutLink: string;
    noveltyLink: string;
    mainLogo: string;
    navLogo: string;
    heroImg: string;
    heroVideo: string;
    heroVideoPoster: string;
    content: ContentItem[];
}


const RestaurantForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        hours: "",
        address: "",
        phone: "",
        lat: 0,
        long: 0,
        domainName: "",
        contactEmail: "",
        reservationLink: "",
        takeoutLink: "",
        noveltyLink: "",
        mainLogo: "",
        navLogo: "",
        heroImg: "",
        heroVideo: "",
        heroVideoPoster: "",
        content: [
            {
                title: "",
                content: "",
                contentImg: "",
                ctaList: [{ cta: "", ctaLink: "", ctaDownload: false }],
            },
        ],
    });

    const imageOptions = ["Mannings_Logo_Manning's Dark_edited_edited.png", "Mannings_Logo_One Color White.png", "Food12.png", "Sign1.jpg", "Menu2.jpg", "Bar5.jpg", "Cocktail21.jpg", "Food23.jpg", "Food27.jpg", "Decor2.jpg"];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name.startsWith('content')) {
            const index = parseInt(name.split('.')[1], 10);
            const fieldName = name.split('.')[2];
            const updatedContent = [...formData.content];
            updatedContent[index][fieldName] = value;
            setFormData({ ...formData, content: updatedContent });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCtaChange = (contentIndex: number, ctaIndex: number, field: keyof CTA, value: string | boolean) => {
        const updatedContent = formData.content.map((contentItem, index) => {
            if (index === contentIndex) {
                return {
                    ...contentItem,
                    ctaList: contentItem.ctaList.map((cta, idx) => {
                        if (idx === ctaIndex) {
                            return { ...cta, [field]: value };
                        }
                        return cta;
                    }),
                };
            }
            return contentItem;
        });

        setFormData({ ...formData, content: updatedContent });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        // Submit form data
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                <Typography variant="h6">Restaurant Information</Typography>
                <TextField name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} variant="outlined" />
                <TextField name="hours" label="Hours" value={formData.hours} onChange={handleChange} variant="outlined" multiline />
                <TextField name="address" label="Address" value={formData.address} onChange={handleChange} variant="outlined" multiline />
                <TextField name="phone" label="Phone" value={formData.phone} onChange={handleChange} variant="outlined" />
                <TextField name="lat" label="Latitude" value={formData.lat} onChange={handleChange} variant="outlined" />
                <TextField name="long" label="Longitude" value={formData.long} onChange={handleChange} variant="outlined" />
                <TextField name="domainName" label="Domain Name" value={formData.domainName} onChange={handleChange} variant="outlined" />
                <TextField name="contactEmail" label="Contact Email" value={formData.contactEmail} onChange={handleChange} variant="outlined" />
                <TextField name="reservationLink" label="Reservation Link" value={formData.reservationLink} onChange={handleChange} variant="outlined" />
                <TextField name="takeoutLink" label="Takeout Link" value={formData.takeoutLink} onChange={handleChange} variant="outlined" />
                <TextField name="noveltyLink" label="Novelty Link" value={formData.noveltyLink} onChange={handleChange} variant="outlined" />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Main Logo</InputLabel>
                    <Select name="mainLogo" value={formData.mainLogo} onChange={handleSelectChange}>
                        {imageOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Repeat Select components for navLogo, heroImg, heroVideo, heroVideoPoster */}

                {formData.content.map((contentItem, index) => (
                    <Box key={index}>
                        <Typography variant="h6">Content Section {index + 1}</Typography>
                        <TextField name={`content.${index}.title`} label="Title" value={contentItem.title} onChange={handleChange} variant="outlined" fullWidth margin="normal" />
                        <TextField name={`content.${index}.content`} label="Content" value={contentItem.content} onChange={handleChange} variant="outlined" fullWidth multiline margin="normal" />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Content Image</InputLabel>
                            <Select name={`content.${index}.contentImg`} value={contentItem.contentImg} onChange={handleSelectChange}>
                                {imageOptions.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {contentItem.ctaList.map((cta, ctaIndex) => (
                            <Box key={ctaIndex} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <TextField
                                    name={`content.${index}.ctaList.${ctaIndex}.cta`}
                                    label="CTA Text"
                                    value={cta.cta}
                                    onChange={(e) => handleCtaChange(index, ctaIndex, 'cta', e.target.value)}
                                    variant="outlined"
                                />
                                <TextField
                                    name={`content.${index}.ctaList.${ctaIndex}.ctaLink`}
                                    label="CTA Link"
                                    value={cta.ctaLink}
                                    onChange={(e) => handleCtaChange(index, ctaIndex, 'ctaLink', e.target.value)}
                                    variant="outlined"
                                    sx={{ mx: 2 }}
                                />
                                <FormControlLabel control={<Checkbox
                                    checked={cta.ctaDownload}
                                    onChange={(e) => handleCtaChange(index, ctaIndex, 'ctaDownload', e.target.checked)}
                                />} label="Is Download?" />
                            </Box>
                        ))}
                    </Box>
                ))}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default RestaurantForm;
