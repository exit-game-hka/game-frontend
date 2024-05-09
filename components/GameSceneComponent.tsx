import React from "react";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {PlayerManagerComponent} from "@/components/managers/PlayerManagerComponent";
import {Canvas} from "@react-three/fiber";
import {RoomManagerComponent} from "@/components/managers/RoomManagerComponent";
import {WORLD_COORDINATE} from "@/app/contants";
import {Girl} from "@/components/Girl";
import {Raum} from "@/api/raum";

type Props = {
    room: Raum;
}
export const GameSceneComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;
    // @ts-ignore
    return (
        <Canvas shadows={true}>
            <OrbitControls/>
            <PerspectiveCamera args={[75, 30, 0]} position={[0, -20, 0]}/>
            <ambientLight intensity={1} color={"white"} shadow={"black"}/>
            <hemisphereLight intensity={1} />
            <pointLight position={[0, 10, 0]} />
            <directionalLight
                color="grey"
                position={[20, 100, 10]}
                target-position={[0, 0, 0]}
                intensity={1}
                castShadow={true}
                shadow-bias={-0.001}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.1}
                shadow-camera-far={500}
                shadow-camera-left={100}
                shadow-camera-right={-100}
                shadow-camera-top={100}
                shadow-camera-bottom={-100}
            />

            <PlayerManagerComponent position={[0, WORLD_COORDINATE[1], 0]} model={Girl} />

            <RoomManagerComponent room={room} />

        </Canvas>
    );
};
