import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OfficeWithFotoFrame} from "@/components/OfficeWithFotoFrame";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/material";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Stack from "@mui/joy/Stack";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const OfficeWithFotoFrameComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Stack spacing={"var(--space-4)"}>
            <Typography
                component={"p"}
                sx={{
                    fontSize: isSmall ? "40px" : "60px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                A → H
            </Typography>
        </Stack>
    );

    const handleClickMonitor = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Hinweis mit dem Text 'A → H' angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <OfficeWithFotoFrame
                // @ts-ignore
                position={[-8.61, WORLD_COORDINATE[1], -8.395]}
                scale={1.8}
                rotation-y={-Math.PI / 2}
                onClickMonitor={handleClickMonitor}
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

