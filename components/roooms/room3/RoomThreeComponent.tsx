import React from 'react';
import {useTexture} from "@/hooks/useTexture";
import {WORLD_COORDINATE} from "@/app/contants";
import {GroundComponent} from "@/components/GroundComponent";
import {OfficeDeskWithFixPhone} from "@/components/OfficeDeskWithFixPhone";
import {WallPictures} from "@/components/WallPictures";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {DoorToPreviousRoomComponent} from "@/components/roooms/DoorToPreviousRoomComponent";
import {GreenBoardWithTableComponent} from "@/components/roooms/room3/components/GreenBoardWithTableComponent";
import {TableWithBooksAndGlobeComponent} from "@/components/roooms/room3/components/TableWithBooksAndGlobeComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {DoubleWallGroupComponent} from "@/components/roooms/room3/components/DoubleWallGroupComponent";

const RoomThreeComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/trefoil-floor.jpg`);

    return (
        <>
            {/* Front wall */}
            <DoubleWallGroupComponent
                firstWall={{
                    position: [0, WORLD_COORDINATE[1], -10],
                }}
                secondWall={{
                    position: [12.5, WORLD_COORDINATE[1], -10],
                }}
            />
            {/* Left side wall */}
            <DoubleWallGroupComponent
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
            <DoubleWallGroupComponent
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
            <DoubleWallGroupComponent
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
            <GreenBoardWithTableComponent raum={raum} />
            <TableWithBooksAndGlobeComponent raum={raum} />
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
                }}
            />
        </>
    );
};

export default RoomThreeComponent;