"use client";
import React, {PropsWithChildren, useEffect} from "react";
import {usePathname} from "next/navigation";
import dynamic from "next/dynamic";
import {useKeysMap} from "@/hooks/useKeysMap";
import {KeyboardControls} from "@react-three/drei";
import {useGlobalStore} from "@/store/useGlobalStore";
import {StatusDto} from "@/api/status";
import {CURRENT_TIMEOUT_LOCAL_STORAGE_KEY} from "@/hooks/useTimer";

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
    const createStatus = useGlobalStore((state) => state.createStatus);
    const getPlayerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);

    useEffect(() => {
        const player = getPlayerFromLocalStorage();
        if (!player) return;

        const statusToSubmit: StatusDto = {
            spielerId: player.id,
            semesterId: player.semesterId,
            veranstaltungId: player.veranstaltungId,
            spielStart: null,
            spielEnde: null,
            istSpielBeendet: false,
            istSpielAbgebrochen: true,
        };

        const handleOnBeforeUnload = (e: any, statusToSubmit: StatusDto) => {
            e?.preventDefault();
            createStatus(statusToSubmit);
            localStorage.setItem(CURRENT_TIMEOUT_LOCAL_STORAGE_KEY, "0:0");
        };

        window.addEventListener("beforeunload", (e) => handleOnBeforeUnload(e, statusToSubmit));

        return () => {
            window.removeEventListener("beforeunload", () => {});
        };
    }, [createStatus, getPlayerFromLocalStorage]);

    return (
        <KeyboardControls map={keysMap}>
            {pathname.includes("game-scene") ? null : <AppBarComponent />}
            {children}
            <WebSocketNotificationEmitter />
        </KeyboardControls>
    )
};
