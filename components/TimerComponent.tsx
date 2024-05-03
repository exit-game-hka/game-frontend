import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Box, Typography} from "@mui/joy";
import {Card} from "@mui/material";
import {useMediaQuery} from "@/hooks/useMediaQuery";

type Props = {
    timeout: number;
    onTimeout: () => void;
};

export const TimerComponent: React.FC<Props> = (props) => {
    const { timeout, onTimeout } = props;

    const [minutes, setMinutes] = useState<number>(timeout / 1000);
    const [seconds, setSeconds] = useState<number>(0);
    const { isSmall } = useMediaQuery();

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    return;
                }
                setSeconds(59);
                setMinutes(minutes - 1);
                return;
            }
            setSeconds(seconds - 1);
        }, 1000);

        if (minutes === 0 && seconds === 0) {
            onTimeout();
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <TimerContainer>
            <CardContainer small={`${isSmall}`}>
                <Typography level="h3">
                    {`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`}
                </Typography>
            </CardContainer>
        </TimerContainer>
    )
};

const TimerContainer = styled(Box)`
    position: fixed;
    z-index: 1000000000;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
`;
const CardContainer = styled(Card)<{ small: "true" | "false" }>`
    display: grid;
    justify-content: center;
    justify-items: center;
    //bottom: -50%;
    box-shadow: 0 0 10px black;
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

