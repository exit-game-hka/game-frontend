import React, {useState} from 'react';
import {ThreeElements, useLoader} from "@react-three/fiber";
import {DoubleSide, TextureLoader} from "three";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box} from "@mui/material";
import Stack from "@mui/joy/Stack";

type Props = ThreeElements["mesh"];
export const JuliusCaesarComponent: React.FC<Props> = (props) => {
    const texture = useLoader(TextureLoader, "/rooms/room2/julius_caesar.png");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalContent = (
        <Stack spacing={"var(--space-3)"} sx={{ mt: "var(--space-4)" }}>
            <Box
                component={"img"}
                src={"/rooms/room2/julius_caesar.png"}
                alt={"Julius Caesar"}
                sx={{
                    width: "100%",
                    maxWidth: "350px",
                    objectFit: "cover",
                    borderRadius: "var(--space-3)",
                    boxShadow: "0 0 10px grey",
                }}
            />
        </Stack>
    );

    return (
        <>
            <mesh
                onClick={() => setIsOpen(true)}
                {...props}
            >
                <planeGeometry args={[1, 1]}/>
                <meshPhysicalMaterial map={texture} side={DoubleSide}/>
            </mesh>
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
