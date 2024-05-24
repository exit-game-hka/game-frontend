import React, {useState} from 'react';
import {WallPictures} from "@/components/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Card} from "@mui/material";
import {Typography} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const WallPapersComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Card>
            <Typography
                component={"p"}
                sx={{
                    fontSize: isSmall ? "40px" : "60px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                SUBSTITUTION
            </Typography>
        </Card>
    );

    const handleClickCoffeeFrame = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Auf das Plakat mit dem Text 'Substitution' geklickt",
        };
        await createInteraktion(interactionDto);
    }

    return (
        <>
            <WallPictures
                // @ts-ignore
                scale={1.5}
                rotation-y={-Math.PI}
                position={[9.95, 0, -6]}
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

