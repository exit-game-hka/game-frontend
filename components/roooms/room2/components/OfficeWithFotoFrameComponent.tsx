import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OfficeWithFotoFrame} from "@/components/OfficeWithFotoFrame";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/material";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Stack from "@mui/joy/Stack";

export const OfficeWithFotoFrameComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();

    const modalContent = (
        <Stack spacing={"var(--space-4)"}>
            <Typography
                component={"p"}
                sx={{
                    fontSize: isSmall ? "40px" : "60px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                A → H
            </Typography>
            <Typography level={"title-md"}>
                Siebenfache Verschiebung
            </Typography>
        </Stack>
    );

    return (
        <>
            <OfficeWithFotoFrame
                // @ts-ignore
                position={[-8.61, WORLD_COORDINATE[1], -8.395]}
                scale={1.8}
                rotation-y={-Math.PI / 2}
                onClickMonitor={() => setIsOpen(true)}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    title="Hinweis"
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                    }}
                />
            </Html>
        </>
    );
};

