import {create} from "zustand";
import {ComponentType, ForwardRefExoticComponent, RefAttributes} from "react";
import {PropsModelComponent} from "@/context/ApplicationContext";
import {Amy} from "@/components/avatars/Amy";
import {Leonard} from "@/components/avatars/Loenard";

export type AvatarItem = {
    name: string;
    model: AvatarType;
    thumbnail: string;
    onClick?: (() => void) | undefined;
};

export type AvatarType = ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<any>>;

type AvatarStore = {
    avatarList: AvatarItem[];
    selectedAvatar: AvatarItem | undefined;
    setSelectedAvatar: (avatar: AvatarItem) => void;
};

const INITIAL_AVATAR_LIST: AvatarItem[] = [
    {
        name: "Amy",
        model: Amy,
        thumbnail: "/models/avatars/amy/thumbnail.png",
    },
    {
        name: "Leonard",
        model: Leonard,
        thumbnail: "/models/avatars/leonard/thumbnail.png",
    },
];

export const useAvatarStore = create<AvatarStore>((set) => ({
    avatarList: INITIAL_AVATAR_LIST,
    selectedAvatar: INITIAL_AVATAR_LIST[0],
    setSelectedAvatar: (newAvatar: AvatarItem) => set(() => ({ selectedAvatar: newAvatar })),
}));