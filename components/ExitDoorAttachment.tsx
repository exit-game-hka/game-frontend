import React, {forwardRef} from 'react';
import {ThreeElements, useLoader} from "@react-three/fiber";
import {Mesh, TextureLoader} from "three";

type Props = ThreeElements["mesh"];

export const ExitDoorAttachment = forwardRef<Mesh, Props>(function ExitDoorAttachment(props: Props, ref) {
    const texture = useLoader(TextureLoader, `${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/exit-door-attachment.jpg`);
    return (
        <mesh ref={ref} {...props} dispose={null}>
            <planeGeometry args={[5, 5]} />
            <meshPhysicalMaterial map={texture} />
        </mesh>
    );
});

