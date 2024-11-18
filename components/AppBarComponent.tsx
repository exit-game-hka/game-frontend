"use client";
import React from "react";
import styled from "styled-components";
import {Box, Button, Typography} from "@mui/joy";
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import {ButtonType, useGlobalStore} from "@/store/useGlobalStore";
import ModeSwitcherIconComponent from "@/components/ModeSwitcherIconComponent";
import PlayerIdTagComponent from "@/components/shared/PlayerIdTagComponent";
import {Stack} from "@mui/material";
import {useMediaQuery} from "@/hooks/useMediaQuery";

const AppBarComponent: React.FC = () => {
    const  { isSmall } = useMediaQuery();
    const getSpielerFromLocalStorage = useGlobalStore((state) => state.getSpielerFromLocalStorage);
    const player = getSpielerFromLocalStorage();
    const playerId = player?.spielerId;

    return (
        <AppBarContainer>
            <AppBarContent>
                <Stack component={"div"} spacing={"var(--space-1)"}>
                    <LogoContainer>
                        <Typography level="title-md">Exit Game HKA</Typography>
                    </LogoContainer>
                    {(playerId && isSmall) ? <PlayerIdTagComponent id={playerId} size={"sm"} /> : null}
                </Stack>
                <Box component="div" sx={{ display: "flex", gap: "var(--space-3)", alignItems: "center", alignContent: "center" }}>
                    {(playerId && !isSmall) ? <PlayerIdTagComponent id={playerId} size={"lg"} /> : null}
                    <ModeSwitcherIconComponent />
                </Box>
            </AppBarContent>
        </AppBarContainer>
    );
};

type PropsNavigation = {
    buttons: ButtonType[];
}
const LargeScreenNavigation: React.FC<PropsNavigation> = (props: PropsNavigation) => {
    const { buttons } = props;
    return (
        <ButtonList cols={buttons.length}>
            {buttons.map((b, index) =>
                <Button key={index} variant={b.isActive ? "soft" : "plain"} onClick={b.onClick}>
                    {b.label}
                </Button>
            )}
        </ButtonList>
    );
};

const SmallScreenNavigation: React.FC<PropsNavigation> = (props: PropsNavigation) => {
    const { buttons } = props;
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
                <MoreVert />
            </MenuButton>
            <Menu component="div" placement="bottom-end">
                {buttons.map((b, index) =>
                    <MenuItem key={index} onClick={b.onClick} selected={b.isActive}>
                        {b.label}
                    </MenuItem>
                )}
            </Menu>
        </Dropdown>
    );
}

const AppBarContainer = styled(Box)`
    display: grid;
    align-items: center;
    align-content: center;
    padding: var(--space-1) var(--space-3);
    height: var(--app-bar-height);
    border-bottom: 1px solid #e5eaf2;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--joy-palette-background-body);
`;
const AppBarContent = styled(Box)`
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    align-content: center;
    max-width: var(--max-page-width);
    width: 100%;
    justify-self: center;
`;
const LogoContainer = styled(Box)`
    display: flex;
    gap: var(--space-2);
`;
const ButtonList = styled(Box)<{ cols: number }>`
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
    align-content: center;
    align-items: center;
`;

export default AppBarComponent;
