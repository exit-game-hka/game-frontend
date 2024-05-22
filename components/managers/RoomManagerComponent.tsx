"use client";
import React, {ComponentType, lazy, useMemo} from "react";
import {Raum} from "@/api/raum";
import {RoomProps} from "@/components/roooms/RoomProps";

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

    const ComputedRoom = useMemo((): ComponentType<RoomProps> => {
        switch (room.name) {
            case "Raum 1": return RoomOneComponent
            case "Raum 2": return RoomTwoComponent
            case "Raum 3": return RoomThreeComponent
            case "Raum 4": return RoomFourComponent
            case "Raum 5": return RoomFiveComponent
            case "Raum 6": return RoomSixComponent
            default: return RoomOneComponent
        }
    }, [room]);

    return (
        <ComputedRoom raum={room} />
    );
};

//*********************************************************************************************************************
// IMPORTANT !!!: DO NOT DELETE
//*********************************************************************************************************************
// Legal mentions and Authors of textures on the floor of rooms:

// Room 1
// "Old tile wooden floor texture"
// (https://skfb.ly/oPEzK) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

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

