import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OldStyleOffice} from "@/components/OldStyleOffice";
import {Html} from "@react-three/drei";
import {Box, Card} from "@mui/material";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Typography} from "@mui/joy";

export const OldStyleOfficeComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box component={"div"}>
            <Typography
                level={"title-lg"}
                sx={{
                    textAlign: "center",
                    margin: "var(--space-15) 0",
                }}
            >
                WELCHE METHODE FEHLT?
            </Typography>
        </Box>
    );

    return (
        <>
            <OldStyleOffice
                // @ts-ignore
                position={[-8, WORLD_COORDINATE[1], -8]}
                rotation-y={-Math.PI / 2}
                scale={0.25}
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

