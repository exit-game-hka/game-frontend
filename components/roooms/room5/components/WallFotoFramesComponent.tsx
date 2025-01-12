import React, {useState} from 'react';
import {Typography} from "@mui/material";
import {WallPictures} from "@/components/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box} from "@mui/joy";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {useParams} from "next/navigation";

export const WallFotoFramesComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Box component="div">
            <Typography
                component={"p"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "var(--space-15) 0",
                }}
            >
                TCPAQAFBJCGCCPSDLE
            </Typography>
        </Box>
    );

    const handleClickCoffeeFrame = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Hinweis mit dem Text 'T C P A Q A F B J C G C C P S D L E' angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <WallPictures
                // @ts-ignore
                scale={1.5}
                position={[-9.9, 0, -3.5]}
                onClickCoffeeFrame={handleClickCoffeeFrame}
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
