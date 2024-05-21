"use client";
import React, {ComponentType, ForwardRefExoticComponent, Ref, RefAttributes, useEffect, useRef} from "react";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {Avatar, Box, Button, Typography} from "@mui/joy";
import {Canvas} from "@react-three/fiber";
import {AnimationActions, ObjectAnimation} from "@/context/AnimationContext";
import useAnimationContext from "@/hooks/useAnimationContext";
import {Object3D} from "three";
import Stack from "@mui/joy/Stack";
import {useRouter} from "next/navigation";
import {PropsModelComponent, useGlobalStore} from "@/store/useGlobalStore";

const AvatarSelectionPage: React.FC = () => {
    const router = useRouter();

    const avatarList = useGlobalStore(state => state.avatarList);
    const selectedAvatar = useGlobalStore(state => state.selectedAvatar);
    const setSelectedAvatar = useGlobalStore(state => state.setSelectedAvatar);

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
                <Canvas shadows={true}>
                    <ambientLight intensity={1} color={"white"} shadow={"black"} />
                    <hemisphereLight intensity={1} />
                    <pointLight position={[0, 10, 0]} />
                    {selectedAvatar ? <AvatarWrapperComponent model={selectedAvatar.model} /> : null}
                </Canvas>
                <Stack spacing={"var(--space-7)"} alignItems="center" alignContent="center">
                    <Stack direction={"row"} spacing={"var(--space-9)"}>
                        {avatarList.map((avatar) =>
                            <Stack
                                key={avatar.name}
                                alignItems={"center"}
                                alignContent={"center"}
                                spacing={"var(--space-2)"}
                                sx={{ textAlign: "center", cursor: "pointer" }}
                                onClick={() => setSelectedAvatar(avatar)}
                            >
                                <Avatar
                                    size={"lg"}
                                    variant={"outlined"}
                                    src={avatar.thumbnail}
                                    alt={avatar.name}
                                    sx={{
                                        boxShadow: "0px 0px 3px grey",
                                        border: selectedAvatar?.name === avatar.name ? "2px solid var(--color-primary)" : "1px solid transparent",
                                    }}
                                />
                                <Typography
                                    color={selectedAvatar?.name === avatar.name ? "primary" : "neutral"}
                                    fontWeight={selectedAvatar?.name === avatar.name ? 600 : 500}
                                >
                                    {avatar.name}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                    <Button
                        size={"lg"}
                        sx={{ maxWidth: "150px", width: "100%" }}
                        onClick={() => router.push(`/intro?avatar=${selectedAvatar.name}`)}
                    >
                        Weiter
                    </Button>
                </Stack>
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
    const animationContext = useAnimationContext();

    useEffect(() => {
        if (!modelRef.current) return;
        animationContext.playAnimationAction(modelRef.current.uuid, "idle");
    }, [animationContext.animations]);

    const addAnimationsToAnimationContext = (actions: AnimationActions) => {
        if (!modelRef.current) return;

        const animations: ObjectAnimation = {
            id: modelRef.current.uuid,
            animationActions: actions,
        };
        return animationContext.addAnimation(animations);
    };

    return (
        <props.model
            ref={modelRef as ModelRefType}
            scale={4}
            position={[0, -3.5, -2]}
            rotation-y={Math.PI}
            setAnimationActions={addAnimationsToAnimationContext}
        />
    );
}

export default AvatarSelectionPage;

