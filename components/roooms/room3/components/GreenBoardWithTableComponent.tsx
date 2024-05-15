import React, {useState} from 'react';
import {WORLD_COORDINATE} from "@/app/contants";
import {GreenBoardWithTable} from "@/components/GreenBoardWithTable";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Box, Typography} from "@mui/joy";
import Stack from "@mui/joy/Stack";

export const GreenBoardWithTableComponent: React.FC = () => {
    const [showGreenBoardTip, setShowGreenBoardTip] = useState<boolean>(false);
    const [showFolderTip, setShowFolderTip] = useState<boolean>(false);

    const modalContentGreenBoard = (
        <Box
            component={"img"}
            src={"/rooms/room3/paper.png"}
            alt={"Blatt an der Tafel"}
            sx={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "var(--space-3)",
            }}
        />
    );

    const modalContentFolder = (
        <Stack spacing={"var(--space-3)"}>
            {/*<Box*/}
            {/*    component={"img"}*/}
            {/*    src={"/rooms/room3/book1.png"}*/}
            {/*    alt={"Buch 1"}*/}
            {/*    sx={{*/}
            {/*        width: "100%",*/}
            {/*        objectFit: "cover",*/}
            {/*        borderRadius: "var(--space-3)",*/}
            {/*    }}*/}
            {/*/>*/}
            <Box
                component="div"
                sx={{
                    background: "url('/rooms/room3/book1_bg.png')",
                    borderRadius: "var(--space-3)",
                    p: "var(--space-3) var(--space-5) var(--space-3) var(--space-2)",
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
            <Typography level={"title-lg"} textAlign={"center"}>Buch 1</Typography>
        </Stack>
    );

    return (
        <>
            <GreenBoardWithTable
                // @ts-ignore
                scale={5}
                position={[-1, WORLD_COORDINATE[1] + 0.4, -12]}
                onClickGreenBoard={() => setShowGreenBoardTip(true)}
                onClickFolder={() => setShowFolderTip(true)}
            />
            <Html>
                <TaskModalComponent
                    open={showGreenBoardTip}
                    title="Hinweis"
                    content={modalContentGreenBoard}
                    onClose={() => setShowGreenBoardTip(false)}
                />
                <TaskModalComponent
                    open={showFolderTip}
                    title="Hinweis"
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

