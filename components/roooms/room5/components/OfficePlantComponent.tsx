import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {Html} from "@react-three/drei";
import {Box} from "@mui/material";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";

export const OfficePlantComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Box component={"div"}>
            <Box
                component={"img"}
                src={"/rooms/room5/plant-with-tipp.png"}
                sx={{
                    width: "100%",
                    objectFit: "cover",
                    filter: "drop-shadow(1px 10px 6px rgba(0.05833333358168602,0.05833333358168602,0.05833333358168602,0.550000011920929))",
                    m: "var(--space-2)",
                }}
            />
        </Box>
    );

    return (
        <>
            <OfficePlantLong
                // @ts-ignore
                position={[8, WORLD_COORDINATE[1], -2.5]}
                scale={1.5}
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

