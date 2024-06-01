"use client";
import React, {useEffect, useState} from 'react';
import {Alert, Box, Typography} from "@mui/joy";
import CircularProgress from '@mui/joy/CircularProgress';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const LOADING_TIMEOUT = 20000 as const;

type Props = {
    message: string;
};

export const LoadingComponent: React.FC<Props> = (props) => {
    const { message } = props;
    const [timeReached, setTimeReached] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimeReached(true);
        }, LOADING_TIMEOUT);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

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
                px: "var(--space-6)",
                backgroundColor: theme => theme.vars.palette.background.body,
            }}
        >
            {timeReached ?
                <>
                    <WarningAmberOutlinedIcon sx={{ fontSize: "50px" }} />
                    <Alert color={"danger"}>
                        <Typography level="title-md" sx={{ fontWeight: 500 }}>
                            Die Ladezeit wurde überschritten, versuchen Sie es später erneut!
                        </Typography>
                    </Alert>

                </>
                :
                <>
                    <CircularProgress
                        size={"lg"}
                        sx={{
                            color: "var(--color-primary)",
                        }}
                    />
                    <Typography level="h4" sx={{ fontWeight: 500 }}>{message}</Typography>
                </>
            }
        </Box>
    );
};

