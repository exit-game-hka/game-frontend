import React, {useState} from 'react';
import {Box, Card, Stack, Typography} from "@mui/material";
import {WORLD_COORDINATE} from "@/app/contants";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {TheologicalBookStack} from "@/components/TheologicalBookStack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareIcon from "@mui/icons-material/Square";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const TheologicalBookStackComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isSmall } = useMediaQuery();
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const spade = (
        <Box
            component={"img"}
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/spade.png`}
            alt={"Spade"}
            sx={{
                width: "20px",
                objectFit: "cover",
            }}
        />
    );

    const square = (
        <SquareIcon sx={{ transform: "rotateZ(45deg)" }} />
    );

    const modalContent = (
        <Card
            sx={{
                background: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/ancien_paper.png')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "inherit",
                "& *": {
                    color: "var(--color-black)",
                },
            }}
        >
            <Stack spacing={"var(--space-3)"}>
                <Typography>
                    KRYPTOGRAPHIE: EIN SYSTEM, DAS KLARTEXT IN VERSCHLUESSELTEN TEXT
                    MIT HILFE EINES ALGORITHMUS UMSETZT. AUF DER EMPFAENGERSEITE WIRD
                    DER VERSCHLUESSELTE TEXT DECODIERT. MAN ERHAELT DEN ORIGINAL
                    KLARTEXT.
                </Typography>
                <Typography>
                    KRYPTANALYSE: WIRD VON MITLESERN DES VERSCHLUESSELTEN TEXTES
                    VERWENDET UM DEN UNVERSCHLUESSELTEN ORIGINALTEXT WIEDER
                    HERZUSTELLEN.
                </Typography>
                <Stack direction={"row"} spacing={"var(--space-3)"}>
                    <div><FavoriteIcon /></div>
                    <div>=</div>
                    <div>{square}</div>
                    <div>+</div>
                    <div>{spade}</div>
                </Stack>
                <Stack spacing={"var(--space-2)"}>
                    <Stack direction={"row"} spacing={"var(--space-1)"}>
                        <div><FavoriteIcon/></div>
                        <div>=</div>
                    </Stack>
                    <Stack direction={"row"} spacing={"var(--space-1)"}>
                        <div>{square}</div>
                        <div>=</div>
                    </Stack>
                    <Stack direction={"row"} spacing={"var(--space-1)"}>
                        <div>{spade}</div>
                        <div>=</div>
                    </Stack>
                </Stack>
                <Typography level={isSmall ? "body-xs" : "body-sm"} sx={{ color: "inherit" }}>
                    KTGSYGIUYNSROITPRESPAEYLEKTAPKTL!POIROFLRAY!
                </Typography>
            </Stack>
        </Card>
    );

    const handleClick = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setIsOpen(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Buch 1 über Kryptographie und Kryptananlyse angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <TheologicalBookStack
                // @ts-ignore
                scale={3}
                rotation-y={Math.PI}
                position={[-1, WORLD_COORDINATE[1], -6]}
                onClick={handleClick}
            />
            <TheologicalBookStack
                // @ts-ignore
                scale={3}
                rotation-y={Math.PI}
                position={[-0.5, WORLD_COORDINATE[1], -6.5]}
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
