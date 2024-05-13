import {ThreeElements} from "@react-three/fiber";
import React from "react";
import {BrickWall} from "@/components/BrickWall";

type PropsWallGroup = ThreeElements["group"] & {
    firstWall: ThreeElements["group"];
    secondWall: ThreeElements["group"];
};

export const DoubleWallGroupComponent: React.FC<PropsWallGroup> = (props: PropsWallGroup) => {
    const { firstWall, secondWall, ...rest } = props;

    return (
        <group {...rest}>
            <BrickWall {...firstWall} />
            <BrickWall {...secondWall} />
        </group>
    );
};