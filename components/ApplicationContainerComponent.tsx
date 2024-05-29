"use client";
import React, {PropsWithChildren} from "react";
import {usePathname} from "next/navigation";
import dynamic from "next/dynamic";

const AppBarComponent = dynamic(
    () => import("@/components/AppBarComponent"),
    { ssr: false }
)

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
