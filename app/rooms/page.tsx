"use client"
import React from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import {Box} from "@mui/joy";
import styled from "styled-components";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Image from "next/image";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {Raum} from "@/api/raum";
import {useGlobalStore} from "@/store/useGlobalStore";

const RoomsPage: React.FC = () => {
    const getAllRooms = useGlobalStore((state) => state.getAllRooms);
    const { isSmall } = useMediaQuery();
    const router = useRouter();

    const {
        data: rooms,
        isLoading,
        error,
    } = useSWR<Raum[]>("getAllRooms", getAllRooms);

    const navigateToGameScene = (e: any, roomId: string) => {
        e?.preventDefault();
        router.push(`/game-scene/rooms/${roomId}`);
    }

    if (isLoading || !rooms) return <div>Loading...</div>;

    if (error) return <div>{`Ein Fehler ist aufgetreten: ${(error as Error).toString()}`}</div>;

    return (
        <PageContentWrapperComponent title="Räume" subtitle="Wähle einen Raum aus, um loszulegen">
            <RoomListContainer small={`${isSmall}`}>
                {rooms.map((room, index) =>
                    <RoomItemContainer key={`${room.name}${index}`} onClick={(e) => navigateToGameScene(e, room.id)}>
                        <AspectRatioThumbnailContainer objectFit="cover" active={`${index < 2}`}>
                            <Thumbnail alt="Forest" src={"/thumbnails/forest.jpg"} layout="fill" />
                        </AspectRatioThumbnailContainer>
                        <RoomLabelContainer>
                            <Typography key={1} level="title-md">{room.name}</Typography>
                            <Typography key={2} level="body-sm">{room.beschreibung}</Typography>
                        </RoomLabelContainer>
                    </RoomItemContainer>
                )}
            </RoomListContainer>
        </PageContentWrapperComponent>
    );
};

const RoomListContainer = styled(Box)<{ small: "true" | "false" }>`
    display: grid;
    grid-template-columns: ${(props) => props.small === "true" ? "repeat(1, 1fr)" : "repeat(3, 1fr)"};
    grid-column-gap: var(--space-8);
`;
const RoomItemContainer = styled(Box)`
    display: grid;
    grid-gap: var(--space-1);
    margin-bottom: var(--space-8);
`;
const AspectRatioThumbnailContainer = styled(AspectRatio)<{ active: "true" | "false" }>`
    border-radius: var(--space-3);
    box-shadow: 0 0 20px grey;
    opacity: ${(props) => props.active === "true" ? "unset" : "50%"};

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 40px var(--color-primary);
    };
`;
const Thumbnail = styled(Image)`
    border-radius: var(--space-2);
`;
const RoomLabelContainer = styled(Box)`
    padding: 0 var(--space-2) 0 var(--space-2);
`;

export default RoomsPage;

