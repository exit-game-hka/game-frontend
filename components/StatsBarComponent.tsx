"use client";
import React, {useEffect, useState} from "react";
import {Avatar, Box, Card, LinearProgress, Stack, Typography} from "@mui/joy";
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import styled from "styled-components";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {getRoomNameByTaskId, useGlobalStore} from "@/store/useGlobalStore";
import {useParams, usePathname, useRouter} from "next/navigation";

const NUMBER_OF_ROOMS = 6  as const;

const StatsBarComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();
    const pathname = usePathname();
    const { id } = useParams();
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const selectedAvatar = useGlobalStore((state) => state.selectedAvatar);
    const setProzentZahlAngeklickteObjekte = useGlobalStore((state) => state.setProzentZahlAngeklickteObjekte);
    const prozentZahlAngeklickteObjekte = useGlobalStore((state) => state.prozentZahlAngeklickteObjekte);
    const [numberOfChallengesSolved, setNumberOfChallengesSolved] = useState<number>(0);

    useEffect(() => {
        setProzentZahlAngeklickteObjekte(id as string);
    }, [id]);

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
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: isSmall ? "var(--space-2)" : "var(--space-4)",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                <Stack spacing="var(--space-2)">
                    <div>
                        <LinearProgress
                            size="lg"
                            value={prozentZahlAngeklickteObjekte}
                            determinate
                            thickness={10}
                            variant="outlined"
                        />
                    </div>
                    <Typography fontWeight="bold" level={"body-xs"}>
                        Angeklickte Objekte {getRoomNameByTaskId(id as string)}: {prozentZahlAngeklickteObjekte}%
                    </Typography>
                </Stack>
                <Stack alignItems={"center"}>
                    <Avatar
                        alt={"Charakter"}
                        size={isSmall ? "sm" : "lg"}
                        src={selectedAvatar.thumbnail}
                    />
                    <Typography fontWeight="bold" level={"body-xs"} textAlign={"center"}>
                        {selectedAvatar.name}
                    </Typography>
                </Stack>
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
                    <Typography fontWeight="bold" level={"body-xs"}>
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
    width: ${(props) => props.small === "true" ? "95dvw" : "unset"};

    padding: ${(props) => props.small === "true" ? "var(--space-2) var(--space-3)" : "var(--space-2) var(--space-5)"};
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
