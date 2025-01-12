import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {TableWithBooksAndGlobe} from "@/components/TableWithBooksAndGlobe";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/material";
import Stack from "@mui/joy/Stack";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";
import {useParams} from "next/navigation";

export const TableWithBooksAndGlobeComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContent = (
        <Stack spacing={"var(--space-3)"}>
            <Box
                component="div"
                sx={{
                    background: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room3/book1_bg.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "var(--space-3)",
                    p: "var(--space-4) var(--space-5)",
                }}
            >
                <Stack
                    spacing={"var(--space-3)"}
                    sx={{
                        "& p": {
                            color: "var(--color-black)",
                        },
                    }}
                >
                    <Typography>
                        <b>TRANSPOSITION</b>: METHODE, DURCH DIE SYMBOLE AUS DEM KLARTEXT AN UNTERSCHIEDLICHE STELLEN IM VERSCHLUESSELTEN TEXT POSITIONIERT WERDEN.
                    </Typography>
                    <Typography>
                        SUBSTITUTION: METHODE, DURCH DIE SYMBOLE AUS DEM KLARTEXT DURCH (NORMALERWEISE) ANDERE SYMBOLE IM VERSCHLUESSELTEN TEXT ERSETZT WERDEN.
                    </Typography>
                    <Typography>
                        VERSCHLEIERUNG: METHODE, DURCH DIE ZUSAETZLICHE SYMBOLE IM VERSCHLUESSELTEN TEXT POSITIONIERT WERDEN. DIES DIENT DER VERSCHLEIERUNG DES INHALTES.
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );

    const handleClickBookOnTable = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Buch 2 angeklickt",
        };
        await createInteraktion(id as string, interactionDto);
    };

    return (
        <>
            <TableWithBooksAndGlobe
                // @ts-ignore
                scale={0.5}
                rotation-y={Math.PI}
                position={[4, WORLD_COORDINATE[1], -7]}
                onClickBookOnTable={handleClickBookOnTable}
            />
            <Html>
                <TaskModalComponent
                    open={isOpen}
                    content={modalContent}
                    onClose={() => setIsOpen(false)}
                    modalDialogProps={{
                        maxWidth: "500px",
                    }}
                />
            </Html>
        </>
    );
};
