"use client";
import React, {PropsWithChildren} from "react";
import {usePathname} from "next/navigation";
import dynamic from "next/dynamic";
import {useKeysMap} from "@/hooks/useKeysMap";
import {KeyboardControls} from "@react-three/drei";

const AppBarComponent = dynamic(
    () => import("@/components/AppBarComponent"),
    { ssr: false }
);

const WebSocketNotificationEmitter = dynamic(
    () => import("@/components/WebSocketNotificationInitializer"),
    { ssr: false }
);

type  Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const pathname = usePathname();
    const { keysMap } = useKeysMap();

    return (
        <KeyboardControls map={keysMap}>
            {pathname.includes("game-scene") ? null : <AppBarComponent />}
            {children}
            <WebSocketNotificationEmitter />
        </KeyboardControls>
    )
};
