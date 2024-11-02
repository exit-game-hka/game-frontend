import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OfficeWithFotoFrame} from "@/components/OfficeWithFotoFrame";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Typography} from "@mui/material";
import Stack from "@mui/joy/Stack";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {useParams} from "next/navigation";

export const OfficeWithFotoFrameComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Stack spacing={"var(--space-4)"}>
            <Typography
                component={"p"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                U → N
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
            action: "Hinweis mit dem Text 'U → N' angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
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

