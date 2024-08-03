import React, {PropsWithChildren} from "react";
import {ApplicationContainerComponent} from "@/components/ApplicationContainerComponent";
import dynamic from "next/dynamic";
import {Box} from "@mui/joy";

const StatsBarComponent = dynamic(
    () => import("@/components/StatsBarComponent"),
    { ssr: false }
);
const ToolBarComponent = dynamic(
    () => import("@/components/ToolBarComponent"),
    { ssr: false }
);
const ModeSwitcherIconComponent = dynamic(
    () => import("@/components/ModeSwitcherIconComponent"),
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
            <ModeSwitcherButton />
        </ApplicationContainerComponent>
    )
};

const ModeSwitcherButton: React.FC = () => {
    return (
        <Box
            component="div"
            sx={{
                zIndex: "var(--z-index-content-behind-modal)",
                position: "fixed",
                right: "5%",
                bottom: "5%",
                transform: "translateX(-5%)",
            }}
        >
            <ModeSwitcherIconComponent isBackgroundTransparent />
        </Box>
    );
}

export default GameSceneLayout;
