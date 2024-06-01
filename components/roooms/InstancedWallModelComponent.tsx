import {ThreeElements} from "@react-three/fiber";
import React, {Ref, useEffect, useRef} from "react";
import {DoubleSide, InstancedMesh, Object3D} from "three";

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
            dispose={null}
        >
            <planeGeometry args={[20, 4]}/>
            <meshBasicMaterial
                side={DoubleSide}
                {...meshBasicMaterialProps}
            />
        </instancedMesh>
    )
};
