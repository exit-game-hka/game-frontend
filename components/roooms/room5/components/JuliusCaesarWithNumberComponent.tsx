import React, {useState} from "react";
import {ThreeEvent, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import {useGlobalStore} from "@/store/useGlobalStore";
import Stack from "@mui/joy/Stack";
import {Box} from "@mui/material";
import {InteraktionDto} from "@/api/interaktion";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useParams} from "next/navigation";

const JuliusCaesarWithNumberComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum, ...rest } = props;
    const { id } = useParams();
    const texture = useLoader(
        TextureLoader,
        `${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room5/julius-caesar-with-number.jpg`
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Stack spacing={"var(--space-3)"} sx={{ mt: "var(--space-4)" }}>
            <Box
                component={"img"}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room5/julius-caesar-with-number.jpg`}
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

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Portrait von Julius Caesar mit Zahl 2 angeklickt",
        };
        createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <mesh
                {...rest}
                onClick={handleMeshClick}
                dispose={null}
            >
                <planeGeometry args={[3, 4]}/>
                <meshPhysicalMaterial map={texture} />
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

export default JuliusCaesarWithNumberComponent;
