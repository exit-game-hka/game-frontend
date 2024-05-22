import React, {useState} from 'react';
import {DetectiveOfficeWithWindow} from "@/components/DetectiveOfficeWithWindow";
import {WORLD_COORDINATE} from "@/app/contants";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box} from "@mui/material";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const DetectiveOfficeComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

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

    const handleClickLamp = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Lampe mit der Zahl 2 angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <DetectiveOfficeWithWindow
                // @ts-ignore
                scale={0.6}
                //rotation-y={Math.PI / 2}
                position={[6.8, WORLD_COORDINATE[1], -6.7]}
                onClickLamp={handleClickLamp}
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
