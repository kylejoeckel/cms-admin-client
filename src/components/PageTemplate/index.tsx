// PageTemplate.tsx
import React, { ReactNode } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

interface PageTemplateProps {
    children: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MenuMatrix CMS
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* This is where the child components specific to each route will be rendered */}
                {children}
            </Container>
        </Box>
    );
};

export default PageTemplate;
