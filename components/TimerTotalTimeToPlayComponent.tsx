import React from 'react';
import styled from "styled-components";
import {Box, Typography} from "@mui/joy";
import {Card} from "@mui/material";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useTimer} from "@/hooks/useTimer";

type Props = {
    timeoutInMinute: number;
    onTimeout: () => void;
};

export const TimerTotalTimeToPlayComponent: React.FC<Props> = (props) => {
    const { timeoutInMinute, onTimeout } = props;
    const { minutes, seconds } = useTimer(timeoutInMinute, onTimeout);
    const { isSmall } = useMediaQuery();

    return (
        <TimerContainer small={`${isSmall}`}>
            {/*<CardContainer small={`${isSmall}`}>*/}
                <Typography
                    level="h3"
                    noWrap
                    color={minutes < 0 ? "danger" : "neutral"}
                    sx={{
                        animation: "glow 1.5s ease-in-out infinite alternate;",
                    }}
                >
                    {`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`}
                </Typography>
            {/*</CardContainer>*/}
        </TimerContainer>
    )
};

const TimerContainer = styled(Box)<{ small: "true" | "false" }>`
    //position: fixed;
    //z-index: var(--z-index-scene-controls);
    //left: 50%;
    //top: 0;
    //transform: translateX(-50%);
    justify-self: center;
    width: ${(props) => props.small === "true" ? "90px" : "100px"};
`;
const CardContainer = styled(Card)<{ small: "true" | "false" }>`
    display: grid;
    justify-content: center;
    justify-items: center;
    //bottom: -50%;
    box-shadow: 0 0 10px black;
    width: ${(props) => props.small === "true" ? "150px" : "200px"};
    padding: ${(props) => props.small === "true" ? "var(--space-2) var(--space-4)" : "var(--space-2) var(--space-9)"};
    border-radius: 0 0 var(--space-3) var(--space-3);
    opacity: 70%;
    //overflow-x: auto;
        // min-width: ${(props) => props.small === "true" ? "120px" : "200px"};

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

