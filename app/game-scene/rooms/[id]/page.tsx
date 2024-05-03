"use client";
import React from 'react';
import {TimerComponent} from "@/components/TimerComponent";
import {GameSceneComponent} from "@/components/GameSceneComponent";
import ToolBarComponent from "@/components/ToolBarComponent";
import styled from "styled-components";
import {useParams} from "next/navigation";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {Raum} from "@/api/raum";
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {convertMinutesToMilliseconds} from "@/context/ApplicationContext";

const RoomItemPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const appContext = useApplicationContext();

    const {
        data: room,
        isLoading,
        error,
    } = useSWR<Raum>(`getRoomById-${id}`, () => appContext.getRoomById(id))

    const handleTimeout = () => {
        alert("Time is up!");
    };

    if (isLoading || !room) return <div>Loading...</div>;

    if (error) return <div>{`Ein Fehler ist aufgetreten: ${(error as Error).toString()}`}</div>;

    return (
        <>
            <TimerComponent
                timeout={convertMinutesToMilliseconds(room.aufgaben[0].zeitZuLoesen)}
                onTimeout={handleTimeout}
            />
            <CanvasContainer>
                <GameSceneComponent room={room} />
            </CanvasContainer>
            <ToolBarComponent />
        </>
    );
};

const CanvasContainer = styled.main`
    height: 100vh;
    //overflow: hidden;
`
export default RoomItemPage;

