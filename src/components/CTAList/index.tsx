import React from 'react';
import {
    TextField,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Switch,
} from '@mui/material';
import PdfSelector from '../PdfSelector';

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

const CTAList: React.FC<{
    ctaList: CTAItem[];
    handleLinkChange: (link: string, idx: number) => void;
    updateData: ContentCardProps['updateData'];
    index: number;
}> = ({ ctaList, handleLinkChange, updateData, index }) => {
    return (
        <>
            {ctaList.map((cta, idx) => (
                <div key={idx}>
                    <TextField label="CTA" value={cta.cta} fullWidth margin="normal" />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Link/Menu</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(cta.ctaDownload)}
                                        onChange={(event) => {
                                            updateData(index, "ctaDownload", event.target.checked, idx);
                                        }}
                                        name="ctaDownload"
                                    />
                                }
                                label={Boolean(cta.ctaDownload) ? 'Menu' : 'Link'}
                            />
                        </FormGroup>
                    </FormControl>
                    {cta.ctaDownload}
                    {cta.ctaDownload ? (
                        <PdfSelector
                            setFile={(file) => handleLinkChange(file, idx)}
                            selectedFile={cta.ctaLink}
                            index={idx}
                        />
                    ) : (
                        <TextField
                            label="Enter Link (https://example.com)"
                            onChange={(event) => handleLinkChange(event.target.value, idx)}
                            value={cta.ctaLink}
                            fullWidth
                            margin="normal"
                        />
                    )}
                </div>
            ))}
        </>
    );
};

export default CTAList;