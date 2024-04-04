import React, { useCallback } from 'react';
import {
    Card,
    TextField,
} from '@mui/material';
import ImageSelector from '../ImageSelector';
import CTAList from '../CTAList';

interface CTAItem {
    cta: string;
    ctaLink: string;
    ctaDownload: boolean;
}

interface ContentItem {
    title: string;
    content: string;
    contentImg: string;
    ctaList: CTAItem[];
}

interface ContentCardProps {
    index: number;
    contentData: ContentItem;
    updateData: (
        index: number,
        parameterName: string,
        value: string | boolean,
        ctaIndex?: number
    ) => void;
}


const ContentCard: React.FC<ContentCardProps> = ({ contentData, updateData, index }) => {
    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        updateData(index, "title", event.target.value);
    }, [index, updateData]);

    const handleContentChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        updateData(index, "content", event.target.value);
    }, [index, updateData]);

    const handleImageChange = useCallback((image: string) => {
        updateData(index, "contentImg", image);
    }, [index, updateData]);

    const handleLinkChange = useCallback((link: string, idx: number) => {
        updateData(index, "ctaLink", link, idx);
    }, [index, updateData]);

    return (
        <Card sx={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <TextField
                label="Title"
                value={contentData.title}
                onChange={handleTitleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Content"
                value={contentData.content}
                onChange={handleContentChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <ImageSelector
                label="Background Image"
                setImage={handleImageChange}
                currentImage={contentData.contentImg}
            />
            <CTAList
                ctaList={contentData.ctaList}
                handleLinkChange={handleLinkChange}
                updateData={updateData}
                index={index}
            />
        </Card>
    );
};

export default ContentCard;
