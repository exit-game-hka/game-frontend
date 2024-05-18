"use client";
import React, {useEffect} from "react";
import {WORLD_COORDINATE} from "@/app/contants";
import {ThreeElements, useLoader, useThree} from "@react-three/fiber";
import {OfficeTableWithLaptop} from "@/components/OfficeTableWithLaptop";
import {BookCupboard} from "@/public/models/book_cupboard/BookCupboard";
import {OldStyleOffice} from "@/components/OldStyleOffice";
import {useTheme} from "@mui/joy";
import {Mesh, MeshStandardMaterial, TextureLoader} from "three";
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {DoubleWallGroupComponent} from "@/components/roooms/room1/components/DoubleWallGroupComponent";
import {
    DetectiveOfficeWithWindowComponent
} from "@/components/roooms/room1/components/DetectiveOfficeWithWindowComponent";
import {WhiteClockComponent} from "@/components/roooms/room1/components/WhiteClockComponent";
import {NumberComponent} from "@/components/roooms/room1/components/NumberComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {RoomProps} from "@/components/roooms/RoomProps";

const RoomOneComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { scene } = useThree();
    const theme = useTheme();
    const doublePaperTexture = useLoader(TextureLoader, "/rooms/room1/double-paper-front.png");
    const { texture } = useTexture("/wooden-floor.png");

    useEffect(() => {
        const setClockInteraction = () => {
            const clockBorder = scene.getObjectByName("clock-border") as Mesh;
            if (!clockBorder || !clockBorder.material) return;

            const clockBorderMaterial = clockBorder.material as MeshStandardMaterial;
            //clockBorderMaterial.color.set(theme.palette.primary["500"]);
        }

        const setPaperInteraction = () => {
            const doublePaper = scene.getObjectByName("double-paper-on-table") as unknown as ThreeElements["mesh"];
            if (!doublePaper || !doublePaper.material) return

            const doublePaperMaterial = doublePaper.material as MeshStandardMaterial;
            doublePaperMaterial.map = doublePaperTexture;
            //doublePaperMaterial.needsUpdate = true;

        }

        const setMonitorInteraction = () => {
            const number = scene.getObjectByName("number-room1") as Mesh;
            if (!number || !number.material) return;
        }

        setClockInteraction();
        setPaperInteraction();
        setMonitorInteraction();
    }, [doublePaperTexture, scene, theme]);

    return (
        <>
            {/* Front wall */}
            <DoubleWallGroupComponent
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
            <DoubleWallGroupComponent
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
            <DoubleWallGroupComponent
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
            <DoubleWallGroupComponent
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

            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000002"}
                doorProps={{
                    position: [18, WORLD_COORDINATE[1], 0],
                }}
            />

            <OfficeTableWithLaptop
                // @ts-ignore
                scale={11}
                rotation-y={Math.PI / 2}
                position={[-2, WORLD_COORDINATE[1], -6]}
            />
            <BookCupboard
                // @ts-ignore
                scale={1}
                position={[3, WORLD_COORDINATE[1], -9.5]}
            />
            <BookCupboard
                // @ts-ignore
                scale={1}
                rotation-y={Math.PI / 2}
                position={[-5.5, WORLD_COORDINATE[1], -1]}
            />

            <DetectiveOfficeWithWindowComponent />

            <WhiteClockComponent />

            <OldStyleOffice
                // @ts-ignore
                position={[15, WORLD_COORDINATE[1], 5]}
                rotation-y={-Math.PI}
                scale={0.25}
            />

            <NumberComponent />

            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                }}
            />
        </>
    );
};

export default RoomOneComponent;
