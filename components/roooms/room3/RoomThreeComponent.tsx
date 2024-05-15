import React from 'react';
import {useFloor} from "@/hooks/useFloor";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {HallWayWall} from "@/components/HallWayWall";
import {ThreeElements} from "@react-three/fiber";
import {OfficeDeskWithFixPhone} from "@/components/OfficeDeskWithFixPhone";
import {WallPictures} from "@/public/models/wall_pictures/WallPictures";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {Raum} from "@/api/raum";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {GreenBoardWithTableComponent} from "@/components/roooms/room3/components/GreenBoardWithTableComponent";
import {TableWithBooksAndGlobeComponent} from "@/components/roooms/room3/components/TableWithBooksAndGlobeComponent";

type Props = {
    raum: Raum;
};
export const RoomThreeComponent: React.FC<Props> = (props) => {
    const { raum } = props;
    const { texture } = useFloor("/trefoil-floor.png");

    return (
        <>
            {/* Front wall */}
            <DoubleWall
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -10],
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -10],
                }}
            />
            {/* Left side wall */}
            <DoubleWall
                position-z={6.2}
                position-x={2.4}
                rotation-y={Math.PI / 2}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -6],
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -6],
                }}
            />
            {/* Right side wall */}
            <DoubleWall
                position-z={-6.25}
                position-x={10.2}
                rotation-y={-Math.PI / 2}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -6],
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -6],
                }}
            />
            {/* Back side wall */}
            <DoubleWall
                position-x={12.5}
                position-z={4}
                rotation-y={Math.PI}
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -6],
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -6],
                }}
            />

            <GreenBoardWithTableComponent />

            <TableWithBooksAndGlobeComponent />

            <OfficeDeskWithFixPhone
                // @ts-ignore
                scale={1.3}
                rotation-y={Math.PI / 10}
                position={[15, WORLD_COORDINATE[1], 5]}
            />

            <WallPictures
                // @ts-ignore
                scale={1.5}
                rotation-y={-Math.PI / 2}
                position={[5, 1, -12.4]}
            />

            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000004"}
                doorProps={{
                    position: [18.5, WORLD_COORDINATE[1], 0],
                }}
            />

            <DoorToPreviousRoomComponent
                doorProps={{
                    position: [-6, WORLD_COORDINATE[1], 0],
                }}
            />

            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                    //wireframe: true
                }}
            />
        </>
    );
};

type PropsDoubleWall = ThreeElements["group"] & {
    firstWall: ThreeElements["group"];
    secondWall: ThreeElements["group"];
};

const DoubleWall: React.FC<PropsDoubleWall> = (props: PropsDoubleWall) => {
    const { firstWall, secondWall, ...rest } = props;
    return (
        <group {...rest}>
            <HallWayWall {...firstWall} />
            <HallWayWall {...secondWall} />
        </group>
    );
}

