import React, {useState} from 'react';
import {Box} from "@mui/material";
import {WhiteClock} from "@/components/WhiteClock";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const ClockComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

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

    const handleClick = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Uhr mit dem Text 'Decode' angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <WhiteClock
                // @ts-ignore
                scale={1.5}
                position={[3, 1, -9.96]}
                rotation-y={-Math.PI / 2}
                onClick={handleClick}
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
