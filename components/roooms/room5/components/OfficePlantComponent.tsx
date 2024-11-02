import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {OfficePlantLong} from "@/components/OfficePlantLong";
import {Html} from "@react-three/drei";
import {Box} from "@mui/material";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {useParams} from "next/navigation";

export const OfficePlantComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Box component={"div"}>
            <Box
                component={"img"}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room5/plant-with-tipp-new.png`}
                sx={{
                    width: "100%",
                    objectFit: "cover",
                    filter: "drop-shadow(1px 10px 6px rgba(0.05833333358168602,0.05833333358168602,0.05833333358168602,0.550000011920929))",
                    m: "var(--space-2)",
                }}
            />
        </Box>
    );

    const handleClickOfficePlantLong = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Pflanze, die auf vier Zeilen hinweist, angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <OfficePlantLong
                // @ts-ignore
                position={[8, WORLD_COORDINATE[1], -2.5]}
                scale={1.5}
                onClick={handleClickOfficePlantLong}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        sx: {
                            maxWidth: "550px",
                            "@media screen and (min-width: 900px)": {
                                mt: -5,
                            },
                        },
                    }}
                />
            </Html>
        </>
    );
};

