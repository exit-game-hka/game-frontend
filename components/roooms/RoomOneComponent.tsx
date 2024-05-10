import React from "react";
import {WORLD_COORDINATE} from "@/app/contants";
import {BrickWall} from "@/components/BrickWall";
import {ThreeElements} from "@react-three/fiber";
import {ExitDoor} from "@/components/ExitDoor";

export const RoomOneComponent: React.FC = () => {
    return (
        <>
            {/* Front wall */}
            <DoubleWallGroup
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -10],
                    scale: 0.5
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -10],
                    scale: 0.5
                }}
            />

            {/* Left side wall */}
            <DoubleWallGroup
                position-z={7.8}
                rotation-y={Math.PI / 2}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -6],
                    scale: 0.5
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -6],
                    scale: 0.5
                }}
            />

            {/* Right side wall */}
            <DoubleWallGroup
                position-z={-4}
                rotation-y={-Math.PI / 2}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -18],
                    scale: 0.5
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -18],
                    scale: 0.5
                }}
            />

            {/* Back side wall */}
            <DoubleWallGroup
                position-x={12.2}
                position-z={8}
                rotation-y={Math.PI}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -6],
                    scale: 0.5,
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -6],
                    scale: 0.5,
                }}
            />

            {/* Exit door */}
            <ExitDoor
                rotation-y={-Math.PI / 2}
                // @ts-ignore
                position={[18, WORLD_COORDINATE[1], 0]}
                scale={1}
                setAnimationActions={() => {}}
            />

            {/*<ObjectMultiplierComponent*/}
            {/*    key={2}*/}
            {/*    model={Cloud}*/}
            {/*    count={1000}*/}
            {/*    getPosition={() => [*/}
            {/*        (Math.random() * 2 - 1) * 300,*/}
            {/*        40,*/}
            {/*        (Math.random() * 2 - 1) * 300*/}
            {/*    ]}*/}
            {/*/>*/}
        </>
    );
};

type PropsWallGroup = ThreeElements["group"] & {
    firstWall: ThreeElements["group"];
    secondWall: ThreeElements["group"];
};

const DoubleWallGroup: React.FC<PropsWallGroup> = (props: PropsWallGroup) => {
    const { firstWall, secondWall, ...rest } = props;

    return (
        <group {...rest}>
            <BrickWall {...firstWall} />
            <BrickWall {...secondWall} />
        </group>
    );
}