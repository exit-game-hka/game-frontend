"use client";
import React, {ReactNode, useMemo} from "react";
import {RoomOneComponent} from "@/components/roooms/room1/RoomOneComponent";
import {Raum} from "@/api/raum";
import {RoomThreeComponent} from "@/components/roooms/room3/RoomThreeComponent";

type Props = {
    room: Raum
}
export const RoomManagerComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;

    const computedRoom = useMemo((): ReactNode => {
        switch (room.name) {
            case "Raum 1": return <RoomOneComponent raum={room} />
            case "Raum 3": return <RoomThreeComponent raum={room} />
            default: return <RoomOneComponent raum={room} />
        }
    }, [room]);

    return (
        <>
            {computedRoom}
            {/*<QuestionBoxComponent onClick={() => setShowTaskModal(true)} />*/}
        </>
    );
};

//*********************************************************************************************************************
// IMPORTANT !!!: DO NOT DELETE
//*********************************************************************************************************************
// Legal mentions and textures Authors:

// Room 1
// "Old tile wooden floor texture"
// (https://skfb.ly/oPEzK) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 2

// Room 3
// "Bathroom Floor"
// (https://skfb.ly/6CILA) by RubaQewar is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

