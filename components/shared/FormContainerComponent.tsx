"use client";
import React, {PropsWithChildren} from 'react';
import {Stack} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";

type Props = PropsWithChildren;

export const FormContainerComponent: React.FC<Props> = (props) => {
    const { children } = props;
    const { isSmall } = useMediaQuery();

    return (
        <Stack spacing={"var(--space-3)"} sx={{ width: isSmall ? "100%" : "500px" }}>
            {children}
        </Stack>
    );
};

