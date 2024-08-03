"use client";
import React from "react";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import IconButton from "@mui/joy/IconButton";
import {useColorScheme} from "@mui/material";

type Props = {
    isBackgroundTransparent?: boolean | undefined;
}
const ModeSwitcherIconComponent: React.FC<Props> = (props) => {
    const { isBackgroundTransparent } = props;
    const { mode, setMode } = useColorScheme();

    const switchMode = () => {
        setMode(mode === "dark" ? "light" : "dark");
    }

    return (
        <IconButton variant={isBackgroundTransparent ? "solid" : "outlined"} onClick={switchMode}>
            {mode === "light" ? <NightsStayOutlinedIcon /> : <WbSunnyOutlinedIcon />}
        </IconButton>
    )
};

export default ModeSwitcherIconComponent;
