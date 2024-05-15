import React from "react";
import {BrickWall} from "@/components/BrickWall";
import {DoubleWallGroupProps} from "@/components/roooms/DoubleWallGroupProps";

export const DoubleWallGroupComponent: React.FC<DoubleWallGroupProps> = (props) => {
    const { firstWall, secondWall, ...rest } = props;

    return (
        <group {...rest}>
            <BrickWall {...firstWall} />
            <BrickWall {...secondWall} />
        </group>
    );
};