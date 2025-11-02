import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const ConsentBanner = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        try {
            const consent = localStorage.getItem('echi_consent');
            if (!consent) {
                setShow(true);
            }
        } catch (e) { }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem('echi_consent', 'true');
            setShow(false);
        } catch (e) { }
    };

    if (!show) {
        return null;
    }

    return (
        <Box sx={{ p: 2, position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.paper', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
                We use cookies to ensure you get the best experience on our website.
            </Typography>
            <Button variant="contained" onClick={handleAccept}>Accept</Button>
        </Box>
    );
};