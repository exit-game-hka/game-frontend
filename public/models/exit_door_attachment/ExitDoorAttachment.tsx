import React, {forwardRef} from 'react';
import {ThreeElements, useLoader} from "@react-three/fiber";
import {Mesh, TextureLoader} from "three";

type Props = ThreeElements["mesh"];

export const ExitDoorAttachment = forwardRef<Mesh, Props>(function ExitDoorAttachment(props: Props, ref) {
    const texture = useLoader(TextureLoader, "/rooms/exit-door-attachment.png");
    return (
        <mesh ref={ref} {...props}>
            <planeGeometry args={[5, 5]} />
            <meshPhysicalMaterial map={texture} />
        </mesh>
    );
});

