import React, {forwardRef} from 'react';
import {ThreeElements, useLoader} from "@react-three/fiber";
import {Mesh, TextureLoader} from "three";
import {Text} from "@react-three/drei";

type Props = ThreeElements["mesh"] & {
    attachmentColor?: string;
    groupProps?: ThreeElements["group"] | undefined;
};

export const ExitDoorAttachment = forwardRef<Mesh, Props>(function ExitDoorAttachment(props: Props, ref) {
    const { attachmentColor, groupProps } = props;
    //const texture = useLoader(TextureLoader, `${process.env.NEXT_PUBLIC_BASE_PATH}/rooms/exit-door-attachment.jpg`);
    return (
        // <mesh ref={ref} {...props} dispose={null}>
        //     <planeGeometry args={[5, 5]} />
        //     <meshPhysicalMaterial map={texture} />
        // </mesh>
        <group {...(groupProps ?? {})}>
            <Text
                color={attachmentColor ?? "#64378C"}
                rotation-y={-Math.PI / 2}
                position={[9.98, 1.3, 0]}
                anchorX="center"
                anchorY="middle"
                scale={0.3}
            >
                Zum nächsten Raum
            </Text>
            <Text
                color={attachmentColor ?? "#64378C"}
                rotation-y={-Math.PI / 2}
                position={[9.98, 1, 0]}
                anchorX="center"
                anchorY="middle"
                scale={0.2}
            >
                Exit Game HKA
            </Text>
            <Text
                color={attachmentColor ?? "#64378C"}
                rotation-y={-Math.PI / 2}
                position={[9.98, 0.6, 0]}
                anchorX="center"
                anchorY="middle"
                scale={0.4}
            >
                ↡
            </Text>
        </group>
    );
});

