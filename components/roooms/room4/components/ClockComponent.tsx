import React, {useState} from 'react';
import {Box} from "@mui/material";
import {WhiteClock} from "@/components/WhiteClock";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";

export const ClockComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box
            component={"div"}
            sx={{
                display: "grid",
                gridTemplateColumns: "minmax(290px, 1fr)",
            }}
        >
            <Box
                component={"img"}
                src={"/rooms/room4/clock-with-keyword.png"}
                sx={{
                    width: "100%",
                    objectFit: "cover",
                }}
            />
        </Box>
    );

    return (
        <>
            <WhiteClock
                // @ts-ignore
                scale={1.5}
                position={[3, 1, -9.96]}
                rotation-y={-Math.PI / 2}
                onClick={() => setIsOpen(true)}
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
