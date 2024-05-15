"use client";
import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {RoomOneComponent} from "@/components/roooms/room1/RoomOneComponent";
import {Raum} from "@/api/raum";
import {Html} from "@react-three/drei";
import {ModalProps, TaskModalComponent} from "@/components/shared/TaskModalComponent";
import useApplicationContext from "@/hooks/useApplicationContext";
import {RoomThreeComponent} from "@/components/roooms/room3/RoomThreeComponent";

type Props = {
    room: Raum
}
export const RoomManagerComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;
    const {modalProps, setModalProps} = useApplicationContext();

    const computedRoom = useMemo((): ReactNode => {
        switch (room.name) {
            case "Raum 1": return <RoomOneComponent raum={room} />
            case "Raum 3": return <RoomThreeComponent raum={room} />
            default: return <RoomOneComponent raum={room} />
        }
    }, [room.name]);

    return (
        <>
            {computedRoom}
            {/*<QuestionBoxComponent onClick={() => setShowTaskModal(true)} />*/}
            <Html>
                <TaskModalComponent
                    {...modalProps}
                    onClose={() => setModalProps({...modalProps, open: false })}
                />
            </Html>
        </>
    );
};

//*********************************************************************************************************************
// IMPORTANT !!!: DO NOT DELETE
//*********************************************************************************************************************
// Legal mentions and textures Authors:

// "Old tile wooden floor texture"
// (https://skfb.ly/oPEzK) by Tijerín Art Studio is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

