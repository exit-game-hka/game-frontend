import * as THREE from "three";
import React, {useRef, ForwardRefExoticComponent, RefAttributes, Ref} from "react";
import {ThreeElements} from "@react-three/fiber";
import {QuestionBox} from "@/components/QuestionBox";
import {useFrame} from "@react-three/fiber";
import {InteractiveObjectComponent} from "@/context/ApplicationContext";

type Props = InteractiveObjectComponent;
export const QuestionBoxComponent: React.FC<Props> = (props: Props) => {
    const ref = useRef<ThreeElements["group"]>();
    const { onClick } = props;

    useFrame((state, delta) => {
        if (!ref.current) return;

        //const questionBox = ref.current;
        //questionBox.rotation.x += 0.1;
        //questionBox.rotation.x += 0.1;
        // if (questionBox.position.y > 10) {
        //     questionBox.position.y -= -Math.sin(delta * 10) * 0.1;
        // }
        // if (questionBox.position.y < 1) {
        //     questionBox.position.y += Math.sin(delta * 10) * 0.1;
        // }
    });

    const QuestionBoxToRender = QuestionBox as ForwardRefExoticComponent<RefAttributes<ThreeElements["group"]>>;

    return (
        <QuestionBoxToRender
            ref={ref as Ref<ThreeElements["group"]>}
            // @ts-ignore
            scale={1}
            position={[2.8, 1, 0]}
            castShadow={true}
            onClick={onClick}
        />
    )
}