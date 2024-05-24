import React, {useState} from 'react';
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Number} from "@/components/Number";
import {Box, Typography} from "@mui/joy";
import {Html} from "@react-three/drei";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {InteraktionDto} from "@/api/interaktion";
import {ThreeEvent} from "@react-three/fiber";

export const NumberComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Box component={"div"}>
            <Typography
                component={"p"}
                sx={{
                    fontSize: "100px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "auto",
                }}
            >
                26
            </Typography>
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
            action: "Auf die Zahl 26 geklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <Number
                scale={0.45}
                rotation-y={Math.PI / 2}
                position={[-6, 3, 0.5]}
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

