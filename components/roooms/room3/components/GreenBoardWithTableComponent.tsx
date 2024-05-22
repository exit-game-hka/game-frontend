import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {GreenBoardWithTable} from "@/components/GreenBoardWithTable";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";
import {useGlobalStore} from "@/store/useGlobalStore";
import {ThreeEvent} from "@react-three/fiber";
import {InteraktionDto} from "@/api/interaktion";

export const GreenBoardWithTableComponent: React.FC<InteractiveObjectProps> = (props) => {
    const { raum } = props;
    const [showGreenBoardTip, setShowGreenBoardTip] = useState<boolean>(false);
    const [showFolderTip, setShowFolderTip] = useState<boolean>(false);
    const createInteraktion = useGlobalStore((state) => state.createInteraktion);
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    const modalContentGreenBoard = (
        <Stack
            component={"div"}
            sx={{
                borderRadius: "var(--space-3)",
                background: "url('/rooms/room3/paper-room3.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                p: "var(--space-4) var(--space-5)",
                "& p": {
                    color: "var(--color-black)",
                    fontWeight: 700,
                },
            }}
        >
            <Stack spacing={"var(--space-5)"}>
                <Typography level={"body-sm"}>REIHENFOLGE</Typography>
                <Typography level={"title-lg"}>
                    SPARTAS MILITAER BENUTZTE SCYTALE CODE, ABER WELCHE METHODE?
                </Typography>
                <Typography level={"body-sm"} textAlign={"center"}>TEILEN</Typography>
                <Typography level={"title-lg"}>SAFPGTARARENTI!</Typography>
            </Stack>
            <Typography level={"body-sm"} sx={{ alignSelf: "flex-end" }}>
                1, 2, X
            </Typography>
        </Stack>
    );

    const modalContentFolder = (
        <Stack spacing={"var(--space-3)"}>
            <Box
                component="div"
                sx={{
                    background: "url('/rooms/room3/book1_bg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "var(--space-3)",
                    p: "var(--space-3) var(--space-5) var(--space-3) var(--space-2)",
                    "& *": {
                        color: "var(--color-black)",
                    },
                }}
            >
                <Typography component="ul" fontSize={"title-sm"} fontWeight={700}>
                    <li>
                        1900 V.CHR. – NICHTSTANDARDISIERTE HIEROGLYPHEN WERDEN VON DEN AEGYPTERN VERWENDET, UM GEHEIME NACHRICHTEN ZU SCHUETZEN.
                    </li>
                    <li>
                        400 V.CHR. - SPARTAS MILITAER BENUTZT DEN SCYTALE CODE.
                    </li>
                    <li>
                        800 AD – AL-KINDI ERFINDET DIE FREQUENZANALYSE ALS MOEGLICHKEIT CODES ZU BRECHEN.
                    </li>
                    <li>
                        1400 AD – EUROPAEISCHE KOENIGSHAEUSER VERWENDEN KRYPTOGRAPHIE UM IHRE NACHRICHTEN ZU SCHUETZEN.
                    </li>
                    <li>
                        1580 AD – BABINGTON VERSCHWOERUNG GEGEN KOENIGIN ELIZABETH DIE ERSTE WIRD AUFGEDECKT – DURCH DAS BRECHEN VON CODES.
                    </li>
                    <li>
                        1914 AD – ERSTER WELTKRIEG – ALLE SEITEN BENUTZEN KRYPTOGRAPHIE.
                    </li>
                    <li>
                        1939 AD – ZWEITER WELTKRIEG – NACHRICHTEN WERDEN ERFOLGREICH GESCHUETZT, EINIGE VERSCHLUESSELTE NACHRICHTEN WERDEN ALLERDINGS AUCH ERFOLGREICH DEKODIERT.
                    </li>
                </Typography>
            </Box>
        </Stack>
    );

    const handleClickGreenBoard = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setShowGreenBoardTip(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Tafel mit Info über Spartas Militär angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    const handleClickFolder = async (event: ThreeEvent<MouseEvent>) => {
        event?.stopPropagation();
        setShowFolderTip(true);
        const spieler = getSpielerFromLocalStorage();
        if (!spieler) return;
        const interactionDto: InteraktionDto = {
            spielerId: spieler.id,
            aufgabeId: raum.aufgaben[0].id,
            action: "Buch 1 angeklickt",
        };
        await createInteraktion(interactionDto);
    };

    return (
        <>
            <GreenBoardWithTable
                // @ts-ignore
                scale={5}
                position={[-1, WORLD_COORDINATE[1] + 0.4, -12]}
                onClickGreenBoard={handleClickGreenBoard}
                onClickFolder={handleClickFolder}
            />
            <Html>
                <TaskModalComponent
                    open={showGreenBoardTip}
                    content={modalContentGreenBoard}
                    onClose={() => setShowGreenBoardTip(false)}
                />
                <TaskModalComponent
                    open={showFolderTip}
                    content={modalContentFolder}
                    onClose={() => setShowFolderTip(false)}
                    modalDialogProps={{
                        maxWidth: "550px",
                    }}
                />
            </Html>
        </>
    );
};

