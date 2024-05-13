"use client";
import React, {PropsWithChildren} from "react";
import {AppBarComponent} from "@/components/AppBarComponent";
import {usePathname} from "next/navigation";
import {AnimationContextProvider} from "@/context/AnimationContext";
import {ApplicationContextProvider} from "@/context/ApplicationContext";

type  Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const pathname = usePathname();

    return (
        <ApplicationContextProvider>
            <AnimationContextProvider>
                {pathname.includes("game-scene") ? null : <AppBarComponent />}
                {children}
            </AnimationContextProvider>
        </ApplicationContextProvider>
    )
};
