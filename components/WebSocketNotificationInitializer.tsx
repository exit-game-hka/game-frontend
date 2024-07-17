"use client";
import React, {useEffect} from "react";
import {useGlobalStore} from "@/store/useGlobalStore";

const WebSocketNotificationInitializer: React.FC = () => {
    const webSocketNotificationClient = useGlobalStore((state) => state.webSocketNotificationClient);

    useEffect(() => {
        webSocketNotificationClient.onConnect = () => {};
        webSocketNotificationClient.activate();

        return () => {
            if (!webSocketNotificationClient.connected) return;
            webSocketNotificationClient.deactivate();
        };
    }, [webSocketNotificationClient]);

    return null;
};

export default WebSocketNotificationInitializer;
