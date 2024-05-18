import React, {useState} from 'react';
import {Typography} from "@mui/material";
import {WallPictures} from "@/public/models/wall_pictures/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box} from "@mui/joy";

export const WallFotoFramesComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box component="div">
            <Typography
                component={"p"}
                level={"title-md"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "var(--space-15) 0",
                }}
            >
                UWDUVKVWVKQPFWTEJECGUCTOGGVUVTCPURQUKVKQP
            </Typography>
        </Box>
    );

    return (
        <>
            <WallPictures
                // @ts-ignore
                scale={1.5}
                position={[-9.9, 0, -3.5]}
                onClickCoffeeFrame={() => setIsOpen(true)}
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

