"use client";
import React, {useEffect, useState} from "react";
import {Box, Card, LinearProgress, Stack, Typography} from "@mui/joy";
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import styled from "styled-components";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useGlobalStore} from "@/store/useGlobalStore";
import {usePathname, useRouter} from "next/navigation";

const NUMBER_OF_ROOMS = 6  as const;

const StatsBarComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const pathname = usePathname();
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const [numberOfChallengesSolved, setNumberOfChallengesSolved] = useState<number>(0);

    useEffect(() => {
        const player = getSpielerFromLocalStorage();
        if (!player) return;
        const resolveNumberOfChallengesSolvedByPlayer = async () => {
            const playerResults = await useGlobalStore.getState().getErgebnisBySpielerId(player.id);
            const numberOfChallengesSolvedByPlayer = playerResults.filter((result) => result.geloestIn).length;
            setNumberOfChallengesSolved(numberOfChallengesSolvedByPlayer);
        }
        resolveNumberOfChallengesSolvedByPlayer();
    }, [pathname]);

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
                    <Typography fontWeight="bold" level={isSmall ? "body-xs" : "body-sm"}>
                        Angeklickte Objekte: 4%
                    </Typography>
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
                            value={(numberOfChallengesSolved / NUMBER_OF_ROOMS) * 100}
                            determinate
                            thickness={10}
                            variant="outlined"
                        />
                    </div>
                    <Typography fontWeight="bold" level={isSmall ? "body-xs" : "body-sm"}>
                        Gelöste Rätsel: {numberOfChallengesSolved} von 6
                    </Typography>
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
    min-width: 350px;

    padding: ${(props) => props.small === "true" ? "var(--space-2) var(--space-3)" : "var(--space-2) var(--space-9)"};
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
