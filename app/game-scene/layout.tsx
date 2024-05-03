import React, {PropsWithChildren} from "react";
import { ApplicationContainerComponent } from "@/components/ApplicationContainerComponent";

type  Props = PropsWithChildren;
const GameSceneLayout: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <ApplicationContainerComponent>
            {children}
        </ApplicationContainerComponent>
    )
};

export default GameSceneLayout;