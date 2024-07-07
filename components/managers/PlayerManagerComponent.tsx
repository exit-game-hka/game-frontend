"use client";
import {ThreeElements} from "@react-three/fiber";
import React, {useEffect, useRef,} from "react";
import * as THREE from "three";
import {Controls} from "@/hooks/useKeysMap";
import {AnimationActions, ObjectAnimation, useGlobalStore} from "@/store/useGlobalStore";
import {useKeyboardControls} from "@react-three/drei";
import Ecctrl from "ecctrl";

type Props = ThreeElements["mesh"]

export const PlayerManagerComponent: React.FC<Props> = (props: Props) =>  {
    const playerRef = useRef<THREE.Object3D | null>(null);

    const selectedAvatar = useGlobalStore((state) => state.selectedAvatar);

    const playAnimationAction = useGlobalStore((state) => state.playAnimationAction);
    const animations = useGlobalStore((state) => state.animations);
    const addAnimation = useGlobalStore((state) => state.addAnimation);
    const resetToDefaultAnimation = useGlobalStore((state) => state.resetToDefaultAnimation);
    const listenToKeyboardKeyPress = useGlobalStore((state) => state.listenToKeyboardKeyPress);

    const forwardKeyPressed = useKeyboardControls<Controls>((state) => state.forward);
    const rightKeyPressed = useKeyboardControls<Controls>((state) => state.rightward);
    const backKeyPressed = useKeyboardControls<Controls>((state) => state.backward);
    const leftKeyPressed = useKeyboardControls<Controls>((state) => state.leftward);
    const jumpKeyPressed = useKeyboardControls<Controls>((state) => state.jump);

    useEffect(() => {
        if (!playerRef.current) return;
        playAnimationAction(playerRef.current.uuid, "idle");
    }, [animations]);

    useEffect(() => {
        if (!playerRef.current || !listenToKeyboardKeyPress) return;
        const player = playerRef.current;

        if (rightKeyPressed || leftKeyPressed || forwardKeyPressed || backKeyPressed) {
            playAnimationAction(player.uuid, "run");
            return;
        }
        if (jumpKeyPressed) {
            playAnimationAction(player.uuid, "jump", 1);
            return;
        }
        resetToDefaultAnimation(playerRef.current.uuid);
    }, [rightKeyPressed, leftKeyPressed, forwardKeyPressed, backKeyPressed, jumpKeyPressed, listenToKeyboardKeyPress]);

    const addAnimationsToAnimationStore = (actions: AnimationActions) => {
        if (!playerRef.current) return;

        const animations: ObjectAnimation = {
            id: playerRef.current.uuid,
            animationActions: actions,
        };
        return addAnimation(animations);
    }

    return (
        <Ecctrl
            animated
            maxVelLimit={listenToKeyboardKeyPress ? 6 : 0}
            capsuleHalfHeight={0.4}
            mode={"PointToMove"}
        >
            <selectedAvatar.model
                ref={playerRef}
                {...props}
                rotation={[0, Math.PI, 0]}
                setAnimationActions={addAnimationsToAnimationStore}
            />
        </Ecctrl>
    );
}
