import React, {PropsWithChildren} from "react";
import {ApplicationContainerComponent} from "@/components/ApplicationContainerComponent";
import {TimeManagerComponent} from "@/components/managers/TimeManagerComponent";
import ToolBarComponent from "@/components/ToolBarComponent";

type  Props = PropsWithChildren;
const GameSceneLayout: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <ApplicationContainerComponent>
            <TimeManagerComponent />
            {children}
            <ToolBarComponent />
        </ApplicationContainerComponent>
    )
};

export default GameSceneLayout;
