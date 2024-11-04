"use client";
import React, {PropsWithChildren, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import dynamic from "next/dynamic";
import {useKeysMap} from "@/hooks/useKeysMap";
import {KeyboardControls} from "@react-three/drei";
import {useGlobalStore} from "@/store/useGlobalStore";
import {StatusDto} from "@/api/status";
import {CURRENT_TIMEOUT_LOCAL_STORAGE_KEY} from "@/hooks/useTimer";
import {getPasswordHashApi} from "@/api/frontendUser";

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
    const router = useRouter();
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

    useEffect(() => {
        switch (pathname) {
            case "/outro": return;
            case "/result-and-qrcode": return;
            default: {
                getPasswordHashApi("frontend_user").then((pwd) => {
                    if (pwd.data === window.localStorage.getItem("pwd")) return;
                    router.push("/");
                });
                break;
            }
        }
    }, [pathname, router]);

    return (
        <KeyboardControls map={keysMap}>
            {pathname.includes("game-scene") ? null : <AppBarComponent />}
            {children}
            <WebSocketNotificationEmitter />
        </KeyboardControls>
    )
};
