import React, {useState} from 'react';
import {TableWithBooksAndGlobe} from "@/components/TableWithBooksAndGlobe";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Card} from "@mui/material";
import {Typography} from "@mui/joy";

export const OfficeWithBooksAndGlobeComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Card
            sx={{
                background: "url('/rooms/ancien_paper.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "inherit",
                "& p": {
                    color: "var(--color-black)",
                },
            }}
        >
            <Typography sx={{ fontSize: "20px" }}>
                DIE ANZAHL DER ZEILEN IST WICHTIG
            </Typography>
        </Card>
    );

    return (
        <>
            <TableWithBooksAndGlobe
                // @ts-ignore
                scale={0.5}
                rotation-y={Math.PI}
                position={[-3, -2.2, -6]}
                onClickOpenedDrawer={() => setIsOpen(true)}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    title="Hinweis"
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "500px",
                    }}
                />
            </Html>
        </>
    );
};
