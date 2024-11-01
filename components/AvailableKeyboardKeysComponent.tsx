"use client";
import React, {useEffect, useState} from "react";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";
import {useColorScheme} from "@mui/material";
import {Divider, Stack, Typography} from "@mui/joy";
import Image from "next/image";
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import SwipeVerticalOutlinedIcon from '@mui/icons-material/SwipeVerticalOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import {useMediaQuery} from "@/hooks/useMediaQuery";

type KeyList = {
    description: string;
    detailedDescription?: string;
    keyIcons: string[];
}

const AvailableKeyboardKeysComponent: React.FC = () => {
    const { mode, setMode } = useColorScheme();
    const { isSmall } = useMediaQuery();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!mode) return;
        if (mode === "light" || mode === "dark") return;
        setMode("light");
    }, [mode]);

    const keyList: KeyList[] = [
        {
            description: "Vorwärts",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/up-${mode}.svg`,
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/w-${mode}.svg`,
            ],
        },
        {
            description: "Links",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/left-${mode}.svg`,
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/a-${mode}.svg`,
            ],
        },
        {
            description: "Rückwärts",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/down-${mode}.svg`,
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/s-${mode}.svg`,
            ],
        },
        {
            description: "Rechts",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/right-${mode}.svg`,
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/d-${mode}.svg`,
            ],
        },
        {
            description: "Springen",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/space-${mode}.svg`,
            ],
        },
        {
            description: "Vollbildmodus aktivieren/verlassen",
            detailedDescription: "Nicht in allen Browsern verfügbar",
            keyIcons: [
                `${process.env.NEXT_PUBLIC_BASE_PATH}/keys/fullscreen-${mode}.svg`,
            ],
        },
    ];

    const modalContent = (
        <Stack sx={{ justifySelf: "stretch" }} spacing={1.3}>
            <Stack>
                <Typography level="h3">Spielsteuerung</Typography>
                <Typography level="body-sm">Tasten können kombiniert verwendet werden</Typography>
            </Stack>
            {keyList.map((key) =>
                <React.Fragment key={key.description}>
                    <Stack
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: 1,
                            alignContent: "center",
                            alignItems: "center",
                            px: 0.5,
                        }}
                    >
                        <Stack>
                            <Typography fontWeight={"bold"}>{key.description}</Typography>
                            <Typography level="body-sm">{key.detailedDescription}</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {key.keyIcons.map((icon, index, arr) =>
                                <React.Fragment key={icon}>
                                    <Image
                                        src={icon}
                                        alt={icon}
                                        width={icon.includes("space") ? 155 : 50}
                                        height={50}
                                        objectFit={"contain"}
                                        style={{
                                            cursor: "pointer",
                                            transition: "border 0.3s ease",
                                        }}
                                    />
                                    {index !== arr.length - 1 ? <Typography>oder</Typography> : null}
                                </React.Fragment>
                            )}
                        </Stack>
                    </Stack>
                    <Divider />
                </React.Fragment>
            )}
            <Stack
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 1,
                    alignContent: "center",
                    alignItems: "center",
                    px: 0.5,
                }}
            >
                <Stack>
                    <Typography fontWeight={"bold"}>
                        Sichtwinkel und Position der 3D-Kamera ändern
                    </Typography>
                    <Typography level="body-sm">
                        Linksklick + Maus bewegen
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <AdsClickOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                    <Typography level="title-lg" fontWeight={"bold"}>+</Typography>
                    <MouseOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                </Stack>
            </Stack>

            <Divider />

            <Stack
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 1,
                    alignContent: "center",
                    alignItems: "center",
                    px: 0.5,
                }}
            >
                <Stack>
                    <Typography fontWeight={"bold"}>
                        Sichttiefe der 3D-Kamera anpassen
                    </Typography>
                    <Typography level="body-sm">
                        Mausrad drehen oder vertikales Streichen mit zwei Fingern auf Trackpad
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MouseOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                    <Typography>oder</Typography>
                    <SwipeVerticalOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                </Stack>
            </Stack>
        </Stack>
    );
    return (
        <>
            <SportsEsportsOutlinedIcon
                onClick={() => setIsOpen(true)}
                sx={{ fontSize: "var(--icon-medium)", color: "inherit" }}
            />
            <TaskModalComponent
                open={isOpen}
                content={modalContent}
                onClose={() => setIsOpen(false)}
                modalDialogProps={{
                    sx: {
                        maxWidth: "600px",
                        maxHeight: isSmall ? "unset" : "800px",
                        "@media screen and (min-width: 900px)": {
                            mt: -8,
                        },
                        "@media screen and (max-width: 900px)": {
                            pb: "calc(1.5 * var(--space-20))",
                        },
                    }
                }}
            />
        </>
    )
};

export default AvailableKeyboardKeysComponent;
