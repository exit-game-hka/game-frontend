import React, {useState} from 'react';
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {WhiteClock} from "@/components/WhiteClock";
import {Box} from "@mui/joy";
import {Html} from "@react-three/drei";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {InteraktionDto} from "@/api/interaktion";
import {ThreeEvent} from "@react-three/fiber";

export const WhiteClockComponent: React.FC<InteractiveObjectProps> = (props) => {
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
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room1/clock.png`}
                sx={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
            />
        </Box>
    );

    const handleClickWhiteClock = async (e: ThreeEvent<MouseEvent>) => {
        e?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Schwarzes alphanumerisches Rad angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <WhiteClock
                // @ts-ignore
                scale={1.5}
                position={[1, 3, -9.6]}
                rotation-y={-Math.PI / 2}
                onClick={handleClickWhiteClock}
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

