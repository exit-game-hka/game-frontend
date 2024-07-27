import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OldStyleOffice} from "@/components/OldStyleOffice";
import {Html} from "@react-three/drei";
import {Box} from "@mui/material";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Typography} from "@mui/joy";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const OldStyleOfficeComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Box component={"div"}>
            <Typography
                sx={{
                    textAlign: "center",
                    margin: "var(--space-15) 0",
                }}
            >
                Welche Methode ist gesucht?
            </Typography>
        </Box>
    );

    const handleClickMonitor = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Notiz 'Welche Methode fehlt?' angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <OldStyleOffice
                // @ts-ignore
                position={[-8, WORLD_COORDINATE[1], -8]}
                rotation-y={-Math.PI / 2}
                scale={0.25}
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
