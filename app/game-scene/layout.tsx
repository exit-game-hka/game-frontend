import React, {PropsWithChildren} from "react";
import {ApplicationContainerComponent} from "@/components/ApplicationContainerComponent";
import dynamic from "next/dynamic";

const StatsBarComponent = dynamic(
    () => import("@/components/StatsBarComponent"),
    { ssr: false }
);
const ToolBarComponent = dynamic(
    () => import("@/components/ToolBarComponent"),
    { ssr: false }
);

type  Props = PropsWithChildren;
const GameSceneLayout: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <ApplicationContainerComponent>
            <StatsBarComponent />
            {children}
            <ToolBarComponent />
        </ApplicationContainerComponent>
    )
};

export default GameSceneLayout;
