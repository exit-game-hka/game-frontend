"use client";
import React, {ComponentType, lazy, useEffect, useMemo, useState} from "react";
import {Raum} from "@/api/raum";
import {RoomProps} from "@/components/roooms/RoomProps";
import {RigidBody} from "@react-three/rapier";
import {Html} from "@react-three/drei";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {Button, Stack, Typography} from "@mui/material";

const RoomOneComponent = lazy(() => import("../../components/roooms/room1/RoomOneComponent"));
const RoomTwoComponent = lazy(() => import("../../components/roooms/room2/RoomTwoComponent"));
const RoomThreeComponent = lazy(() => import("../../components/roooms/room3/RoomThreeComponent"));
const RoomFourComponent = lazy(() => import("../../components/roooms/room4/RoomFourComponent"));
const RoomFiveComponent = lazy(() => import("../../components/roooms/room5/RoomFiveComponent"));
const RoomSixComponent = lazy(() => import("../../components/roooms/room6/RoomSixComponent"));

type Props = {
    room: Raum
}
export const RoomManagerComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;
    const [showHelpMessage, setShowHelpMessage] = useState<boolean>(true);
    const [helpMessage, setHelpMessage] = useState<string>("");

    const ComputedRoom = useMemo((): ComponentType<RoomProps> => {
        switch (room.name) {
            case "Raum 1": {
                setHelpMessage("SIE GEHEN IN DEN RAUM UND HINTER IHNEN SCHLIESST SICH DIE TUER. HAT DER PROFESSOR " +
                    "SIE ETWA EINGESPERRT? SUCHEN SIE NACH HINWEISEN, UM DIE TUER ZU OEFFNEN! EIN TIPP: " +
                    "KLICKEN SIE AUF LERNINHALTE FUER MEHR UNTERSTUETZUNG."
                );
                return RoomOneComponent;
            }
            case "Raum 2": {
                setHelpMessage("NANU? HINTER DER TUER VERBARG SICH EIN TUNNEL IN EINEN ANDEREN RAUM. NACH " +
                    "AUFRAUMEN FUEHLT SICH DAS NICHT AN. WAS HAT ES NUR DAMIT AUF SICH? UND WAS SIND DAS FUER " +
                    "MERKWUERDIGE BILDER AN DER WAND?"
                );
                return RoomTwoComponent;
            }
            case "Raum 3": {
                setHelpMessage("AUCH HINTER DIESER TUER VERBARG SICH NICHT DIE TREPPE ZUM KELLERAUFGANG, " +
                    "SONDERN SIE SPAWNEN IN EINEM WEITEREN RAUM. ERLAUBT SICH DER PROFESSOR ETWA EINEN SPASS AUS " +
                    "IHNEN? IN DER ECKE STEHT EINE TAFEL...SOLLEN SIE ETWA SEINE NAECHSTE VORLESUNG VORBEREITEN?"
                );
                return RoomThreeComponent;
            }
            case "Raum 4": {
                setHelpMessage("IM NEUEN RAUM ANGEKOMMEN, KENNEN SIE SO LANGSAM DAS PRINZIP DIESER " +
                    "MERKWUERDIGEN AUFGABE IHRES PROFESSORS. DIE RAETSEL KOMMEN IHNEN SELTSAM BEKANNT VOR...SIND " +
                    "DAS ETWA UEBUNGSAUFGABEN, DIE DER PROFESSOR FUER DIE ANSTEHENDE KLAUSUR PLANT? VIELLEICHT SIND " +
                    "IM SCHRANK NOCH MEHR ALTKLAUSUREN VERSTECKT?"
                );
                return RoomFourComponent;
            }
            case "Raum 5": {
                setHelpMessage("SIE ATMEN TIEF DURCH...DIE LUFT IN DIESEM RAUM SCHEINT AUSSERGEWOEHNLICH " +
                    "FRISCH. WONACH DUFTET ES HIER? LIEGT DAS ETWA AN DER PFLANZE? DABEI HAT DER PROFESSOR DOCH GAR " +
                    "KEINEN GRUENEN DAUMEN! WAS HAT ES DAMIT AUF SICH?"
                );
                return RoomFiveComponent;
            }
            case "Raum 6": {
                setHelpMessage("HOEREN SIE DAS? KOMMEN DA ETWA STIMMEN AUS DEM TRESOR?");
                return RoomSixComponent;
            }
            default: return RoomOneComponent
        }
    }, [room]);

    const taskModalContent = (
        <Stack component={"div"} spacing={5}>
            <Typography>{helpMessage}</Typography>
            <Button onClick={() => setShowHelpMessage((prev) => !prev)}>
                Schließen
            </Button>
        </Stack>
    );

    // The RigidBody wrapper auto generates a collider around every child object
    return (
        <>
            <RigidBody type={"fixed"}>
                <ComputedRoom raum={room} />
            </RigidBody>
            <Html>
                <TaskModalComponent
                    open={showHelpMessage}
                    content={taskModalContent}
                    modalDialogProps={{
                        maxWidth: "500px",
                    }}
                />
            </Html>
        </>
    );
};

//*********************************************************************************************************************
// IMPORTANT !!!: DO NOT DELETE
//*********************************************************************************************************************
// Legal mentions and Authors of textures on the floor of rooms:

// Room 1
// "Old tile wooden floor texture"
// (https://skfb.ly/oPEzK) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
//
// "Brick wall United Kingdom"
// (https://skfb.ly/6RPvP) by theovasilis is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 2
// "Wooden floor with smooth finish"
// (https://skfb.ly/oPsTS) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 3
// "Bathroom Floor"
// (https://skfb.ly/6CILA) by RubaQewar is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 4
// "Star Tile Floor"
// (https://skfb.ly/6WMSN) by MartyBrosevelt is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// "Medieval Brick Wall"
// (https://skfb.ly/6AFK6) by Pippa is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 5
// "Floor - Marble Tiled Floor"
// (https://skfb.ly/6WYpC) by tsteff63 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

