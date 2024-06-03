"use client";
import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import {useParams} from "next/navigation";
import useSWR from "swr";
import {Raum} from "@/api/raum";
import SplashScreenComponent from "@/components/shared/SplashScreenComponent";
import {useGlobalStore} from "@/store/useGlobalStore";
import {LoadingComponent} from "@/components/shared/LoadingComponent";

const GameSceneComponent = lazy(() => import("../../../../components/GameSceneComponent"));

const RoomItemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const getRoomById = useGlobalStore((state) => state.getRoomById);

    const {
        data: room,
        isLoading,
        error,
    } = useSWR<Raum>(`getRoomById-${id}`, () => getRoomById(id))

    if (isLoading || !room) return <LoadingComponent message={"Daten werden geladen"} />;

    if (error) return <div>{`Es ist ein Fehler ist aufgetreten: ${(error as Error).toString()}`}</div>;

    return (
        <CanvasContainer>
            <Suspense fallback={<SplashScreenComponent />}>
                <GameSceneComponent room={room} />
            </Suspense>
        </CanvasContainer>
    );
};

const CanvasContainer = styled.main`
    height: 100vh;
`
export default RoomItemPage;
