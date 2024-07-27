import React, {useState} from 'react';
import {WallPictures} from "@/components/WallPictures";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Typography} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import { Text } from "@react-three/drei";

export const WallPapersComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Typography
            component={"p"}
            sx={{
                //fontSize: isSmall ? "40px" : "60px",
                fontWeight: "bold",
                textAlign: "center",
                margin: "auto",
            }}
        >
            Substitution
        </Typography>
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
            <Text
                scale={[0.15, 0.15, 0.15]}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[9.92, 0.4, -6.9]}
                rotation-y={-Math.PI / 2}
            >
                Substitution
            </Text>
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

