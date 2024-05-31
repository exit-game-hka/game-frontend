"use client";
import React, {Ref, useEffect, useRef} from "react";
import {WORLD_COORDINATE} from "@/app/contants";
import {ThreeElements, useLoader, useThree} from "@react-three/fiber";
import {BookCupboard} from "@/components/BookCupboard";
import {useTheme} from "@mui/joy";
import {DoubleSide, InstancedMesh, Mesh, MeshStandardMaterial, Object3D, TextureLoader} from "three";
import {useTexture} from "@/hooks/useTexture";
import {GroundComponent} from "@/components/GroundComponent";
import {
    DetectiveOfficeWithWindowComponent
} from "@/components/roooms/room1/components/DetectiveOfficeWithWindowComponent";
import {WhiteClockComponent} from "@/components/roooms/room1/components/WhiteClockComponent";
import {NumberComponent} from "@/components/roooms/room1/components/NumberComponent";
import {ExitDoorComponent} from "@/components/roooms/ExitDoorComponent";
import {RoomProps} from "@/components/roooms/RoomProps";
import {Number} from "@/components/Number";

const RoomOneComponent: React.FC<RoomProps> = (props) => {
    const { raum } = props;
    const { scene } = useThree();
    const theme = useTheme();
    const doublePaperTexture = useLoader(TextureLoader, `${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/room1/double-paper-front.png`);
    const { texture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/wooden-floor.png`);
    const { texture: wallTexture } = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH}/brick_wall_united_kingdom_neutral.png`, [5, 1]);

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
            {/* Front wall*/}
            {/*<DoubleWallGroupComponent*/}
            {/*    firstWall={{*/}
            {/*        position: [0, WORLD_COORDINATE[1], -10],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*    secondWall={{*/}
            {/*        position: [12.5, WORLD_COORDINATE[1], -10],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*/>*/}

            {/*/!* Left side wall *!/*/}
            {/*<DoubleWallGroupComponent*/}
            {/*    position-z={7.8}*/}
            {/*    rotation-y={Math.PI / 2}*/}
            {/*    firstWall={{*/}
            {/*        position: [0, WORLD_COORDINATE[1], -6],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*    secondWall={{*/}
            {/*        position: [12.5, WORLD_COORDINATE[1], -6],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*/>*/}

            {/*/!* Right side wall *!/*/}
            {/*<DoubleWallGroupComponent*/}
            {/*    position-z={-4}*/}
            {/*    rotation-y={-Math.PI / 2}*/}
            {/*    firstWall={{*/}
            {/*        position: [0, WORLD_COORDINATE[1], -18],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*    secondWall={{*/}
            {/*        position: [12.5, WORLD_COORDINATE[1], -18],*/}
            {/*        scale: 0.5*/}
            {/*    }}*/}
            {/*/>*/}

            {/*/!* Back side wall *!/*/}
            {/*<DoubleWallGroupComponent*/}
            {/*    position-x={12.2}*/}
            {/*    position-z={8}*/}
            {/*    rotation-y={Math.PI}*/}
            {/*    firstWall={{*/}
            {/*        position: [0, WORLD_COORDINATE[1], -6],*/}
            {/*        scale: 0.5,*/}
            {/*    }}*/}
            {/*    secondWall={{*/}
            {/*        position: [12.5, WORLD_COORDINATE[1], -6],*/}
            {/*        scale: 0.5,*/}
            {/*    }}*/}
            {/*/>*/}

            <InstancedWallModelComponent
                meshProps={{
                    scale: [1.5, 2, 1.5],
                    position: [0, WORLD_COORDINATE[1] * -3, 0],
                }}
                meshBasicMaterialProps={{
                    map: wallTexture,
                }}
                modelsProps={[
                    {
                        position: [0, WORLD_COORDINATE[1], -10],
                        rotation: [0, 0, 0],
                    },
                    {
                        position: [-10, WORLD_COORDINATE[1], 0],
                        rotation: [0, Math.PI / 2, 0],
                    },
                    {
                        position: [0, WORLD_COORDINATE[1], 10],
                        rotation: [0, 0, 0],
                    },
                    {
                        position: [10, WORLD_COORDINATE[1], 0],
                        rotation: [0, -Math.PI / 2, 0],
                    },
                ]}
            />

            <ExitDoorComponent
                aufgabe={raum.aufgaben[0]}
                nextRoomId={"20000000-0000-0000-0000-000000000002"}
                doorProps={{
                    position: [15, WORLD_COORDINATE[1], 0],
                }}
            />

            {/*<OfficeTableWithLaptop*/}
            {/*    // @ts-ignore*/}
            {/*    scale={11}*/}
            {/*    rotation-y={Math.PI / 2}*/}
            {/*    position={[-2, WORLD_COORDINATE[1], -6]}*/}
            {/*/>*/}
            {/*<BookCupboard*/}
            {/*    // @ts-ignore*/}
            {/*    scale={1}*/}
            {/*    position={[3, WORLD_COORDINATE[1], -9.5]}*/}
            {/*/>*/}
            <BookCupboard
                // @ts-ignore
                scale={1}
                rotation-y={Math.PI / 2}
                position={[-14.4, WORLD_COORDINATE[1], -1]}
            />

            <DetectiveOfficeWithWindowComponent raum={raum} />
            <WhiteClockComponent raum={raum} />
            {/*<OldStyleOffice*/}
            {/*    // @ts-ignore*/}
            {/*    position={[15, WORLD_COORDINATE[1], 5]}*/}
            {/*    rotation-y={-Math.PI}*/}
            {/*    scale={0.25}*/}
            {/*/>*/}
            <NumberComponent raum={raum} />
            <GroundComponent
                position={WORLD_COORDINATE}
                meshMaterialProps={{
                    map: texture,
                }}
            />
        </>
    );
};

type PropsInstances = {
    meshProps?: ThreeElements["instancedMesh"];
    meshBasicMaterialProps?: ThreeElements["meshBasicMaterial"];
    modelsProps: {
        position: [number, number, number],
        rotation: [number, number, number],
    }[];
}
const InstancedWallModelComponent: React.FC<PropsInstances> = (props) => {
    const { modelsProps, meshProps, meshBasicMaterialProps } = props;
    const instancedMeshRef = useRef<InstancedMesh>();

    useEffect(() => {
        const temp = new Object3D();
        // Set positions
        for (let i = 0; i < modelsProps.length; i++) {
            const [px, py, pz] = modelsProps[i].position;
            const [rx, ry, rz] = modelsProps[i].rotation;

            temp.position.set(px, py, pz);
            temp.rotation.set(rx, ry, rz);
            temp.updateMatrix();

            instancedMeshRef.current?.setMatrixAt(i, temp.matrix)
        }
        // Update the instance
        if (!instancedMeshRef.current) return;
        instancedMeshRef.current.instanceMatrix.needsUpdate = true
    }, [modelsProps, modelsProps.length]);

    return (
        <instancedMesh
            {...meshProps}
            ref={instancedMeshRef as Ref<InstancedMesh>}
            args={[undefined, undefined, modelsProps.length]}
        >
            <planeGeometry args={[20, 4]}/>
            <meshBasicMaterial
                side={DoubleSide}
                {...meshBasicMaterialProps}
            />
        </instancedMesh>
    )
};

export default RoomOneComponent;
