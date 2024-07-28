import React, {useEffect} from "react";
import {PerspectiveCamera} from "@react-three/drei";
import {PlayerManagerComponent} from "@/components/managers/PlayerManagerComponent";
import {Canvas, useThree} from "@react-three/fiber";
import {RoomManagerComponent} from "@/components/managers/RoomManagerComponent";
import {VERTICAL_GRAVITATIONAL_ACCELERATION, WORLD_COORDINATE} from "@/app/contants";
import {Raum} from "@/api/raum";
import {Physics} from "@react-three/rapier";

type Props = {
    room: Raum;
}
const GameSceneComponent: React.FC<Props> = (props: Props) => {
    const { room } = props;

    return (
        <Canvas dpr={[0, 1]} performance={{ min: 0.7, current: 0.8 }}>
            <PerspectiveCamera args={[75, 30, 0]} position={[0, -20, 0]} />
            <ambientLight intensity={0.6} color={"white"} />
            <hemisphereLight intensity={1} />
            <pointLight position={[0, 10, 0]} />
            <Physics gravity={[0, VERTICAL_GRAVITATIONAL_ACCELERATION, 0]}>
                <PlayerManagerComponent position={[0, WORLD_COORDINATE[1] + 1.05, 0]} />
                <RoomManagerComponent room={room} />
            </Physics>
            <PerformanceControlComponent />
        </Canvas>
    );
};

const PerformanceControlComponent = () => {
    const current = useThree((state) => state.performance.current)
    const setPixelRatio = useThree((state) => state.setDpr)

    useEffect(() => {
        setPixelRatio(window.devicePixelRatio * current)
    }, [current, setPixelRatio])

    const regress = useThree((state) => state.performance.regress)
    const controls = useThree((state) => state.controls);

    useEffect(() => {
        controls?.addEventListener("change", regress);
        return () => {
            controls?.removeEventListener("change", regress);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            regress();
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return null;
};

export default GameSceneComponent;
