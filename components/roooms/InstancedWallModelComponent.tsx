import {ThreeElements} from "@react-three/fiber";
import React, {Ref, useEffect, useMemo, useRef} from "react";
import {DoubleSide, InstancedMesh, Object3D} from "three";
import {InstancedRigidBodyProps, InstancedRigidBodies} from "@react-three/rapier";
import {WORLD_COORDINATE} from "@/app/contants";

type PropsInstances = {
    meshProps?: ThreeElements["instancedMesh"];
    meshBasicMaterialProps?: ThreeElements["meshBasicMaterial"];
    modelsProps: {
        position: [number, number, number],
        rotation: [number, number, number],
    }[];
}
export const InstancedWallModelComponent: React.FC<PropsInstances> = (props) => {
    const { modelsProps, meshProps, meshBasicMaterialProps } = props;
    const instancedMeshRef = useRef<InstancedMesh>();

    const instances = useMemo(() => {
        const instances: InstancedRigidBodyProps[] = modelsProps.map((m) => ({
            key: "instance_" + Math.random(),
            ...m,
        }));
        return instances;
    }, [modelsProps]);

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
        <InstancedRigidBodies
            scale={meshProps?.scale}
            position-y={WORLD_COORDINATE[1]}
            instances={instances}
        >
            <instancedMesh
                {...meshProps}
                ref={instancedMeshRef as Ref<InstancedMesh>}
                args={[undefined, undefined, modelsProps.length]}
                dispose={null}
            >
                <planeGeometry args={[20, 4]}/>
                <meshBasicMaterial
                    side={DoubleSide}
                    {...meshBasicMaterialProps}
                />
            </instancedMesh>
        </InstancedRigidBodies>

    )
};
