import {ThreeElements} from "@react-three/fiber";

export type DoubleWallGroupProps = ThreeElements["group"] & {
    firstWall: ThreeElements["group"];
    secondWall: ThreeElements["group"];
};