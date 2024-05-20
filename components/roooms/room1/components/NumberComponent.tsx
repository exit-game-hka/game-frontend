import React, {useState} from 'react';
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Number} from "@/public/models/number_for_room1/Number";
import {Box, Typography} from "@mui/joy";
import {Html} from "@react-three/drei";

export const NumberComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box component={"div"}>
            <Typography
                component={"p"}
                sx={{
                    fontSize: "100px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                26
            </Typography>
        </Box>
    );

    return (
        <>
            <Number
                scale={0.45}
                rotation-y={Math.PI / 2}
                position={[-6, 3, 0.5]}
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

