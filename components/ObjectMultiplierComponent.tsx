import {ThreeElements} from "@react-three/fiber";
import React, {ComponentType, ForwardRefExoticComponent, RefAttributes, useMemo} from "react";
import {Coordinate, PropsModelComponent} from "@/context/ApplicationContext";
import {WORLD_COORDINATE, WORLD_HEIGHT, WORLD_WIDTH} from "@/app/contants";

type Props = {
    count: number;
    model: ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<PropsModelComponent>>;
    getPosition: () => Coordinate
}
export const ObjectMultiplierComponent: React.FC<Props> = (props: Props) => {
    const { count, model, getPosition, ...restProps } = props;

    const numberOfInstances = useMemo(
        () => Array.from(Array(count).keys()),
        [count]
    );

    const getRandomPositionOnPlane = (): Coordinate => {
        // Define the plane parameters
        const planeX = WORLD_COORDINATE[0];
        const planeY = WORLD_COORDINATE[1];
        const planeZ = WORLD_COORDINATE[2];
        const planeWidth = WORLD_WIDTH;
        const planeHeight = WORLD_HEIGHT;

        // Generate random x and z coordinates within the plane size
        const x = planeX + Math.random() * planeWidth - planeWidth / 4;
        const z = planeZ + Math.random() * planeHeight - planeHeight / 4;

        // Calculate the y coordinate based on the plane equation
        const y = planeY;

        return [x, y, z];
    };

    return numberOfInstances.map((_i, index) => {
        return (
            <props.model {...restProps} key={index} position={getPosition()} />
        );
    });
}