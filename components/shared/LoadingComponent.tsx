import React from 'react';
import {Box, Typography} from "@mui/joy";
import CircularProgress from '@mui/joy/CircularProgress';

type Props = {
    message: string;
};

export const LoadingComponent: React.FC<Props> = (props) => {
    const { message } = props;
    return (
        <Box
            component="div"
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: "var(--z-index-splash-screen)",
                display: "grid",
                gridGap: "var(--space-4)",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                alignContent: "center",
            }}
        >
            <CircularProgress
                size={"lg"}
                sx={{
                    color: "var(--color-primary)",
                }}
            />
            <Typography>{message}</Typography>
        </Box>
    );
};

