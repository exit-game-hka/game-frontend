import React, {forwardRef} from "react";
import {ThreeElements, useLoader} from "@react-three/fiber";
import {Mesh, TextureLoader} from "three";

type Props = ThreeElements["mesh"];
export const Number = forwardRef<Mesh, Props>(function Number(props, ref) {
    const texture = useLoader(TextureLoader, "/rooms/room1/number.png");

    return (
        <mesh name={"number-room1"} ref={ref} {...props}>
            <planeGeometry args={[3, 3]} />
            <meshPhysicalMaterial map={texture} />
        </mesh>
    );
});