import React, {useState} from 'react';
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {WhiteClock} from "@/components/WhiteClock";
import {Box} from "@mui/joy";
import {Html} from "@react-three/drei";

export const WhiteClockComponent: React.FC = () => {
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
                src={"/rooms/room1/alphanumeric-wheel.png"}
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
                position={[3, 4, -10.1]}
                rotation-y={-Math.PI / 2}
                onClick={() => setIsOpen(true)}
            />
           <Html>
               <TaskModalComponent
                   open={isOpen}
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

