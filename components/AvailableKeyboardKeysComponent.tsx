"use client";
import React, {useEffect, useState} from "react";
import {TaskModalComponent} from "@/components/shared/TaskModalComponent";

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {useColorScheme} from "@mui/material";
import {Stack, Typography} from "@mui/joy";
import Image from "next/image";
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import SwipeVerticalOutlinedIcon from '@mui/icons-material/SwipeVerticalOutlined';

type KeyList = {
    description: string;
    keyIcons: string[];
}

const AvailableKeyboardKeysComponent: React.FC = () => {
    const { mode, setMode } = useColorScheme();
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
    ];

    const modalContent = (
        <Stack sx={{ justifySelf: "stretch" }} spacing={4}>
            {keyList.map((key) =>
                <React.Fragment key={key.description}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
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
                                        width={50}
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
                        <Typography fontWeight={"bold"}>{key.description}</Typography>
                    </Stack>
                </React.Fragment>
            )}
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <AdsClickOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                    <Typography>+</Typography>
                    <MouseOutlinedIcon sx={{ fontSize: "40px", color: mode === "light" ? "black" : "white" }} />
                </Stack>
                <Typography fontWeight={"bold"}>
                    Sichtwinkel und Position der 3D-Kamera ändern(Klick + Maus bewegen)
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
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
                <Typography fontWeight={"bold"}>
                    Sichttiefe der 3D-Kamera vergrößern/verkleinen
                    (Mausrad oder vertikales Streichen mit zwei Fingern auf Trackpad)
                </Typography>
            </Stack>
        </Stack>
    );
    return (
        <>
            <HelpOutlineOutlinedIcon
                onClick={() => setIsOpen(true)}
                sx={{ fontSize: "var(--icon-medium)", color: "inherit" }}
            />
            <TaskModalComponent
                open={isOpen}
                content={modalContent}
                onClose={() => setIsOpen(false)}
                modalDialogProps={{
                    maxWidth: "500px",
                }}
            />
        </>
    )
};

export default AvailableKeyboardKeysComponent;
