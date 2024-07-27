"use client";
import React, {PropsWithChildren} from 'react';
import {Stack} from "@mui/joy";

type Props = PropsWithChildren;

export const FormContainerComponent: React.FC<Props> = (props) => {
    const { children } = props;

    return (
        <Stack spacing={"var(--space-5)"}>
            {children}
        </Stack>
    );
};
