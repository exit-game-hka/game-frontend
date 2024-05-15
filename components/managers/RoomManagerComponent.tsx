"use client";
import React, {ComponentType, ReactNode, useMemo} from "react";
import {RoomOneComponent} from "@/components/roooms/room1/RoomOneComponent";
import {Raum} from "@/api/raum";
import {RoomThreeComponent} from "@/components/roooms/room3/RoomThreeComponent";
import {RoomTwoComponent} from "@/components/roooms/room2/RoomTwoComponent";
import {RoomFourComponent} from "@/components/roooms/room4/RoomFourComponent";
import {RoomFiveComponent} from "@/components/roooms/room5/RoomFiveComponent";
import {RoomSixComponent} from "@/components/roooms/room6/RoomSixComponent";
import {RoomProps} from "@/components/roooms/RoomProps";

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
        <>
            <ComputedRoom raum={room} />
            {/*<QuestionBoxComponent onClick={() => setShowTaskModal(true)} />*/}
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

// Room 2
// "Wooden floor with smooth finish"
// (https://skfb.ly/oPsTS) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

// Room 3
// "Bathroom Floor"
// (https://skfb.ly/6CILA) by RubaQewar is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

