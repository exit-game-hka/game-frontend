"use client";
import React, {PropsWithChildren} from "react";
import {AppBarComponent} from "@/components/AppBarComponent";
import {usePathname} from "next/navigation";

type  Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const pathname = usePathname();

    return (
        <>
            {pathname.includes("game-scene") ? null : <AppBarComponent />}
            {children}
        </>
    )
};
