"use client";
import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import {useParams} from "next/navigation";
import useSWR from "swr";
import {Raum} from "@/api/raum";
import SplashScreenComponent from "@/components/shared/SplashScreenComponent";
import {useGlobalStore} from "@/store/useGlobalStore";
//import dynamic from "next/dynamic";

// const SplashScreenComponent = dynamic(
//     () => import("../../../../components/shared/SplashScreenComponent"),
//     { ssr: false }
// );
const GameSceneComponent = lazy(() => import("../../../../components/GameSceneComponent"));

const RoomItemPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const getRoomById = useGlobalStore((state) => state.getRoomById);

    const {
        data: room,
        isLoading,
        error,
    } = useSWR<Raum>(`getRoomById-${id}`, () => getRoomById(id))

    const handleTimeout = () => {
        alert("Time is up!");
    };

    if (isLoading || !room) return <SplashScreenComponent />;

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
    //overflow: hidden;
`
export default RoomItemPage;
