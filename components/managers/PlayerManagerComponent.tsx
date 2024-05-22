"use client";
import {ThreeElements, useFrame} from "@react-three/fiber";
import React, {Ref, useEffect, useMemo, useRef,} from "react";
import * as THREE from "three";
import {Object3D, QuaternionLike} from "three";
import {useObjectControls} from "@/hooks/useObjectControls";
import {WALKING_SPEED} from "@/app/contants";
import {AnimationActions, ObjectAnimation, useGlobalStore} from "@/store/useGlobalStore";

type ModelRefType =  Ref<Object3D> | undefined;

type Props = ThreeElements["mesh"]

export const PlayerManagerComponent: React.FC<Props> = (props: Props) =>  {
    const playerRef = useRef<THREE.Object3D>();
    const selectedAvatar = useGlobalStore((state) => state.selectedAvatar);

    const playAnimationAction = useGlobalStore((state) => state.playAnimationAction);
    const animations = useGlobalStore((state) => state.animations);
    const addAnimation = useGlobalStore((state) => state.addAnimation);
    const resetToDefaultAnimation = useGlobalStore((state) => state.resetToDefaultAnimation);

    useEffect(() => {
        if (!playerRef.current) return;
        playAnimationAction(playerRef.current.uuid, "idle");
    }, [animations]);

    const initialRotation = [0, 0, 0];

    useFrame((state) => {
        if (!playerRef.current || !animations) return;

        // Instance of the camera
        const { camera } = state;
        const player = playerRef.current;

        //console.log("State: ", state);

        if (keyRight || keyLeft || keyUp || keyDown) {
            resetRotationOfPlayer(player);
        }
        if (keyRight) {
            //updateCameraToFollowPlayer(camera, player);
            player.rotation.y = -Math.PI / 2;
            player.position.x += WALKING_SPEED;
        }
        if (keyLeft) {
            //updateCameraToFollowPlayer(camera, player);
            player.rotation.y = Math.PI / 2;
            player.position.x += -WALKING_SPEED;
        }
        if (keyUp) {
            //updateCameraToFollowPlayer(camera, player);
            player.rotation.y = Math.PI * 2;
            player.position.z += -WALKING_SPEED;
        }
        if (keyDown) {
            //updateCameraToFollowPlayer(camera, player);
            player.rotation.y = -Math.PI;
            player.position.z += WALKING_SPEED;
        }
        if (spaceKey) {
            // resetRotationOfPlayer(player);
        }

        // followPlayer(camera, player);

        if (keyRight || keyLeft || keyUp || keyDown) {
            followPlayer(camera, player);
        }
    });

    const resetRotationOfPlayer = (player: THREE.Object3D) => {
        const [x, y, z] = initialRotation;
        player.rotation.set(x, y, z);
    }

    const { keyLeft, keyRight, keyUp, keyDown, spaceKey } = useObjectControls();

    useMemo(() => {
        if (!playerRef.current) return;
        const player = playerRef.current;

        if (keyRight || keyLeft || keyUp || keyDown) {
            playAnimationAction(player.uuid, "run");
            return;
        }
        if (spaceKey) {
            playAnimationAction(player.uuid, "jump", 1);
            return;
        }
        resetToDefaultAnimation(playerRef.current.uuid);
    }, [keyLeft, keyRight, keyUp, keyDown, spaceKey]);


    const updateCameraToFollowPlayer = (camera: THREE.Camera, player: THREE.Object3D) => {

        const {x: rx, y: ry, z: rz} = player.rotation;
        const {x: px, y: py, z: pz} = player.position;

        // // Ideal Offset
        // const idealOffset = new THREE.Vector3(2, 1, 2);
        // idealOffset.applyQuaternion({x: rx, y: ry, z: rz, w: 0});
        // idealOffset.add({x: px, y: py, z: pz});
        //
        // // Ideal lookAt
        // const idealLookAt = new THREE.Vector3(0, ry, rz);
        // idealLookAt.applyQuaternion({x: rx, y: ry, z: rz, w: 0});
        // idealLookAt.add({x: px, y: py, z: pz});
        //
        // // Updated Position
        // camera.position.copy(idealOffset);
        // //camera.lookAt(idealLookAt);

        const cameraOffset = new THREE.Vector3(0.0, 5.0, 5.0); // NOTE Constant offset between the camera and the target

        // NOTE Assuming the camera is direct child of the Scene
        const objectPosition = new THREE.Vector3();
        player.getWorldPosition(objectPosition);

        //camera.position.copy(objectPosition).add(cameraOffset);
    }

    const calculateOffset = (player: THREE.Object3D): THREE.Vector3 => {
        const offset = new THREE.Vector3(0, 0, 3);
        offset.applyQuaternion(player.rotation as unknown as QuaternionLike);
        offset.add(player.position);
        return offset;
    }
    const calculateLookAt = (player: THREE.Object3D): THREE.Vector3 => {
        const lookAt = new THREE.Vector3(0, 1, 5);
        lookAt.applyQuaternion(player.rotation as unknown as QuaternionLike);
        lookAt.add(player.position);
        return lookAt;
    }

    const followPlayer = (camera: THREE.Camera, player: THREE.Object3D) => {
        // const offset = calculateOffset(player);
        // const lookAt = calculateLookAt(player);
        // camera.position.copy(offset);
        // camera.lookAt(lookAt);

        const {x: rx, y: ry, z: rz} = player.rotation;
        const {x: px, y: py, z: pz} = player.position;

        // Ideal Offset
        const idealOffset = new THREE.Vector3(0, 0, 3);
        //idealOffset.applyQuaternion({x: rx, y: ry, z: rz, w: 0});
        idealOffset.add(player.position);

        // Ideal lookAt
        const idealLookAt = new THREE.Vector3(0, ry, rz);
        idealLookAt.applyQuaternion({x: rx, y: ry, z: rz, w: 0});
        idealLookAt.add({x: px, y: py, z: pz});

        camera.position.copy(idealOffset);

        //camera.position.lerp(player.position, 0.1);
        camera.lookAt(player.position);

    }

    const addAnimationsToAnimationStore = (actions: AnimationActions) => {
        if (!playerRef.current) return;

        const animations: ObjectAnimation = {
            id: playerRef.current.uuid,
            animationActions: actions,
        };
        return addAnimation(animations);
    }

    return (
        <selectedAvatar.model
            ref={playerRef as ModelRefType}
            {...props}
            setAnimationActions={addAnimationsToAnimationStore}
        />
    );
}
