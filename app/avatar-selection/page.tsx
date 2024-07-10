"use client";
import React, {ComponentType, ForwardRefExoticComponent, Ref, RefAttributes, useEffect, useRef, useState} from "react";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {Avatar, Box, Button, Chip, Typography} from "@mui/joy";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Object3D} from "three";
import Stack from "@mui/joy/Stack";
import {useRouter} from "next/navigation";
import {
    AnimationActions,
    AvatarItem,
    ObjectAnimation,
    PropsModelComponent,
    useGlobalStore
} from "@/store/useGlobalStore";
import {useKeyboardControls} from "@react-three/drei";
import {Controls} from "@/hooks/useKeysMap";

const AvatarSelectionPage: React.FC = () => {
    const router = useRouter();
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarItem | undefined>(undefined);
    const selectedAvatarFromStore = useGlobalStore((state) => state.selectedAvatar);
    const leftKeyPressed = useKeyboardControls<Controls>((state) => state.leftward);
    const rightKeyPressed = useKeyboardControls<Controls>((state) => state.rightward);
    const avatarList = useGlobalStore((state) => state.avatarList);
    const setSelectedAvatarInStore = useGlobalStore((state) => state.setSelectedAvatar);

    useEffect(() => {
        setSelectedAvatar(selectedAvatarFromStore);
    }, [selectedAvatarFromStore]);

    useEffect(() => {
        if (!selectedAvatar) return;
        const indexOfCurrentSelectedAvatar = avatarList.findIndex((avatar) => avatar.name === selectedAvatar.name);
        if (leftKeyPressed) {
            if (indexOfCurrentSelectedAvatar === 0) {
                setSelectedAvatarInStore(avatarList[avatarList.length - 1]);
                return;
            }
            setSelectedAvatarInStore(avatarList[indexOfCurrentSelectedAvatar - 1]);
            return;
        }
        if (rightKeyPressed) {
            if (indexOfCurrentSelectedAvatar === avatarList.length - 1) {
                setSelectedAvatarInStore(avatarList[0]);
                return;
            }
            setSelectedAvatarInStore(avatarList[indexOfCurrentSelectedAvatar + 1]);
            return;
        }
    }, [avatarList, leftKeyPressed, rightKeyPressed]);

    if (!selectedAvatar) return null;

    return (
        <PageContentWrapperComponent>
            <Box
                component="div"
                sx={{
                    display: "grid",
                    gridGap: "var(--space-1)",
                    gridTemplateColumns: "minmax(300px, 1fr)",
                    justifyItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "calc(80dvh - var(--app-bar-height))",
                }}
            >
                <Typography level="h2">Wählen Sie Ihren Charakter</Typography>
                <Canvas performance={{ max: 0.7 }}>
                    <ambientLight intensity={0.7} color={"white"} />
                    <hemisphereLight intensity={1.5} />
                    {selectedAvatar ? <AvatarWrapperComponent model={selectedAvatar.model} /> : null}
                </Canvas>
                <Box component="div">
                    <Box component="div" sx={{ maxWidth: "99dvw", overflowX: "auto", borderRadius: "lg" }}>
                        <Stack spacing={"var(--space-7)"}>
                            <Stack
                                direction={"row"}
                                spacing={"var(--space-9)"}
                            >
                                {avatarList.map((avatar, index, array) =>
                                    <Stack
                                        key={avatar.name}
                                        alignItems={"center"}
                                        alignContent={"center"}
                                        spacing={"var(--space-2)"}
                                        sx={{
                                            pt: 0.3,
                                            textAlign: "center",
                                            cursor: "pointer",
                                            paddingLeft: index === 0  ? "var(--space-8)" : "0px",
                                            paddingRight: index === array.length - 1  ? "var(--space-8)" : "0px",
                                        }}
                                        onClick={() => setSelectedAvatarInStore(avatar)}
                                    >
                                        <Avatar
                                            size={"lg"}
                                            variant={"outlined"}
                                            src={avatar.thumbnail}
                                            alt={avatar.name}
                                            sx={{
                                                boxShadow: "0px 0px 4px grey",
                                                border: selectedAvatar?.name === avatar.name ? "2px solid var(--color-primary)" : "2px solid transparent",
                                            }}
                                        />
                                        <Typography
                                            color={selectedAvatar?.name === avatar.name ? "primary" : "neutral"}
                                            fontWeight={selectedAvatar?.name === avatar.name ? 600 : 500}
                                        >
                                            {avatar.name}
                                        </Typography>
                                        {selectedAvatar?.name === avatar.name ?
                                            <Chip
                                                size="sm"
                                                variant="solid"
                                                color="primary"
                                                sx={{ px: "var(--space-4)" , py: "0", minHeight: "5px", }}
                                            /> : null
                                        }
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Box>
                    <Button
                        size={"lg"}
                        sx={{ maxWidth: "150px", width: "100%", mt: "var(--space-9)" }}
                        onClick={() => router.push(`/intro?avatar=${selectedAvatar.name}`)}
                    >
                        Weiter
                    </Button>
                </Box>
            </Box>
        </PageContentWrapperComponent>
    );
};
type ModelRefType =  Ref<Object3D> | undefined;

type PropsAvatarWrapperComponent = {
    model: ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<any>>;
}
const AvatarWrapperComponent: React.FC<PropsAvatarWrapperComponent> = (props: PropsAvatarWrapperComponent) => {
    const modelRef = useRef<Object3D>();
    const playAnimationAction = useGlobalStore((state) => state.playAnimationAction);
    const animations = useGlobalStore((state) => state.animations);
    const addAnimation = useGlobalStore((state) => state.addAnimation);

    const regress = useThree((state) => state.performance.regress);

    useFrame(() => {
        regress();
    });

    useEffect(() => {
        if (!modelRef.current) return;
        playAnimationAction(modelRef.current.uuid, "idle");
    }, [animations, playAnimationAction]);

    const addAnimationsToAnimationStore = (actions: AnimationActions) => {
        if (!modelRef.current) return;

        const animations: ObjectAnimation = {
            id: modelRef.current.uuid,
            animationActions: actions,
        };
        return addAnimation(animations);
    };

    return (
        <props.model
            ref={modelRef as ModelRefType}
            scale={4}
            position={[0, -3.5, -2]}
            rotation-y={Math.PI}
            setAnimationActions={addAnimationsToAnimationStore}
        />
    );
}

export default AvatarSelectionPage;
