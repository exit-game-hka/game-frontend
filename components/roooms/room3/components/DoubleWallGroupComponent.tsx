import React from "react";
import {HallWayWall} from "@/components/HallWayWall";
import {DoubleWallGroupProps} from "@/components/roooms/DoubleWallGroupProps";

export const DoubleWallGroupComponent: React.FC<DoubleWallGroupProps> = (props) => {
    const { firstWall, secondWall, ...rest } = props;
    return (
        <group {...rest}>
            <HallWayWall {...firstWall} />
            <HallWayWall {...secondWall} />
        </group>
    );
}