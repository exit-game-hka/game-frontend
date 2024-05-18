import React, {useState} from 'react';
import {DetectiveOfficeWithWindow} from "@/components/DetectiveOfficeWithWindow";
import {WORLD_COORDINATE} from "@/app/contants";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box} from "@mui/material";

export const DetectiveOfficeComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box component="div">
            <Box
                component={"img"}
                src={"/rooms/room5/lamp-with-number.png"}
                alt={"Lampe mit Nummer drauf"}
                sx={{
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "var(--space-3)",
                    //boxShadow: "0 0 10px grey",
                    filter: "drop-shadow(3px 4px 2px rgba(0.05833333358168602,0.05833333358168602,0.05833333358168602,0.550000011920929))",
                    m: "var(--space-2) 0",
                }}
            />
        </Box>
    );

    return (
        <>
            <DetectiveOfficeWithWindow
                // @ts-ignore
                scale={0.6}
                //rotation-y={Math.PI / 2}
                position={[6.8, WORLD_COORDINATE[1], -6.7]}
                onClickLamp={() => setIsOpen(true)}
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
