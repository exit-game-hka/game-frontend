"use client";
import React from 'react';
import {Card} from "@mui/material";
import styled from "styled-components";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import {Typography, Box} from "@mui/joy";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useRouter} from "next/navigation";
import {ButtonType} from "@/store/useGlobalStore";

const ToolBarComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const router = useRouter();

    const buttons: ButtonType[] = [
        {
            label: "Ergebnisse",
            icon: <EmojiEventsOutlinedIcon sx={{ fontSize: "var(--icon-medium)", color: "inherit" }} />,
            onClick: () => alert("In dev"),
        },
        {
            label: "Aufgaben",
            icon: <ExtensionOutlinedIcon sx={{ fontSize: "var(--icon-medium)", color: "inherit" }} />,
            onClick: () => alert("In dev"),
        },
        {
            label: "Informationen",
            icon: <InfoOutlinedIcon sx={{ fontSize: "var(--icon-medium)", color: "inherit" }} />,
            onClick: () => alert("In dev"),
        },
        {
            label: "Raum verlassen",
            icon: <DoorBackOutlinedIcon sx={{ fontSize: "var(--icon-medium)", color: "inherit" }} />,
            onClick: () => router.push("/"),
        },
        {
            label: "Verkleinen",
            icon: <KeyboardDoubleArrowDownOutlinedIcon sx={{ fontSize: "var(--icon-medium)", color: "inherit" }} />,
            onClick: () => alert("In dev"),
        },
    ];

    return (
        <ToolBarWrapper>
            <CardContainer>
                <ButtonListContainer cols={`${buttons.length}`} small={`${isSmall}`}>
                    {buttons.map((b) =>
                        <ToolBarItem key={b.label} onClick={b.onClick}>
                            {b.icon}
                            {isSmall ? null :
                                <Typography
                                    level="body-md"
                                    textAlign={"center"}
                                    noWrap
                                    sx={{ color: "inherit" }}
                                >
                                {b.label}
                            </Typography>
                            }
                        </ToolBarItem>
                    )}
                </ButtonListContainer>
            </CardContainer>
        </ToolBarWrapper>
    );
};

const ToolBarWrapper = styled.div`
    position: fixed;
    z-index: var(--z-index-scene-controls);
    left: 50%;
    bottom: 4%;
    transform: translateX(-50%);
`;
const CardContainer = styled(Card)`
    display: grid;
    justify-content: center;
    justify-items: center;
    box-shadow: 0 0 10px black;
    padding: var(--space-4);
    border-radius: var(--space-3);
    opacity: 55%;
    overflow-x: auto;
`;
const ButtonListContainer = styled(Box)<{ cols: string, small: "true" | "false" }>`
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
    grid-gap: ${(props) => props.small === "true" ? "var(--space-6)" : "var(--space-3)"};
`;
const ToolBarItem = styled(Box)`
    display: grid;
    grid-gap: 2px;
    justify-items: center;
    justify-content: center;
    border-radius: var(--space-1);
    
    &:hover {
        cursor: pointer;
        color: var(--color-primary);
    }

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export default ToolBarComponent;

