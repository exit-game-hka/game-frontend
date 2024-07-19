"use client";
import React from "react";
import {Box, Card, LinearProgress, Stack, Typography} from "@mui/joy";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import styled from "styled-components";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const StatsBarComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();

    return (
        <StatsContainer small={`${isSmall}`}>
            <Stack
                direction="row"
                spacing="var(--space-3)"
            >
                <Stack spacing="var(--space-2)">
                    <div>
                        <LinearProgress
                            size="lg"
                            value={60}
                            determinate
                            thickness={10}
                            variant="outlined"
                        />
                    </div>
                    <Typography fontWeight="bold">Angeklickte Objekte: 4%</Typography>
                </Stack>
                <Box component="div">
                    <SquareOutlinedIcon
                        sx={{
                            fontSize: "26px",
                            transform: "rotateZ(45deg)",
                        }}
                    />
                </Box>
                <Stack spacing="var(--space-2)">
                    <div>
                        <LinearProgress
                            size="lg"
                            value={20}
                            determinate
                            thickness={10}
                            variant="outlined"
                        />
                    </div>
                    <Typography fontWeight="bold">Gelöste Rätsel: 0 von 6</Typography>
                </Stack>
            </Stack>
        </StatsContainer>
    );
};

const StatsContainer = styled(Card)<{ small: "true" | "false" }>`
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    opacity: 70%;
    z-index: var(--z-index-content-behind-modal);
    
    padding: ${(props) => props.small === "true" ? "var(--space-2) var(--space-4)" : "var(--space-2) var(--space-9)"};
    border-radius: 0 0 var(--space-3) var(--space-3);
    box-shadow: 0 0 10px black;
    
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export default StatsBarComponent;
