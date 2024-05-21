import {create, StateCreator} from "zustand";
import {ComponentType, ForwardRefExoticComponent, RefAttributes} from "react";
import {PropsModelComponent} from "@/context/ApplicationContext";
import {Amy} from "@/components/avatars/Amy";
import {Leonard} from "@/components/avatars/Loenard";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {getSpielerBySpielerIdApi, Spieler} from "@/api/spieler";
import {
    createStatusApi,
    getStatusBySemesterIdApi,
    getStatusBySpielerIdApi,
    Status,
    StatusDto,
    updateStatusApi
} from "@/api/status";

// Avatar store

export type AvatarItem = {
    name: string;
    model: AvatarType;
    thumbnail: string;
    onClick?: (() => void) | undefined;
};

export type AvatarType = ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<any>>;

type AvatarStore = {
    avatarList: AvatarItem[];
    selectedAvatar: AvatarItem;
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

const useAvatarStoreSlice: StateCreator<AvatarStore> = (set) => ({
    avatarList: INITIAL_AVATAR_LIST,
    selectedAvatar: INITIAL_AVATAR_LIST[0],
    setSelectedAvatar: (newAvatar: AvatarItem) => set(() => ({ selectedAvatar: newAvatar })),
});

// Aufgabe store

type AufgabeStore = {
    getAufgabeById: (id: string) => Promise<Aufgabe>;
    getAllAufgaben: () => Promise<Aufgabe[]>;
};
const useAufgabeStoreSlice: StateCreator<AufgabeStore> = () => ({
    getAufgabeById: async (id: string): Promise<Aufgabe> => {
        const response = await getTaskByIdApi(id);
        return response.data;
    },
    getAllAufgaben: async (): Promise<Aufgabe[]> => {
        const response = await getAllTasksApi();
        return response.data;
    },
});

// Room store

type RoomStore = {
    getRoomById: (id: string) => Promise<Raum>;
    getAllRooms: () => Promise<Raum[]>;
};
const useRoomStoreSlice: StateCreator<RoomStore> = () => ({
    getRoomById: async (id: string): Promise<Raum> => {
        const response = await getRoomByIdApi(id);
        return response.data;
    },
    getAllRooms: async (): Promise<Raum[]> => {
        const response = await getAllRoomsApi();
        return response.data;
    },
});

// Spieler store

type SpielerStore = {
    getSpielerBySpielerId: (spielerId: string) => Promise<Spieler>;
    setSpieler: (spieler: Spieler) => void;
    removeSpieler: () => void;
};
const useSpielerStoreSlice: StateCreator<SpielerStore> = () => ({
    getSpielerBySpielerId: async (spielerId: string): Promise<Spieler> => {
        const response = await getSpielerBySpielerIdApi(spielerId);
        return response.data;
    },
    setSpieler: (spielerToSave: Spieler) => {
        localStorage.setItem("player", JSON.stringify(spielerToSave));
    },
    removeSpieler: () => {
        localStorage.removeItem("player");
    },
});

// Status store
type StatusStore = {
    getStatusBySpielerId: (id: string) => Promise<Status>;
    getStatusBySemesterId: (id: string) => Promise<Status>;
    createStatus: (statusDto: StatusDto) => Promise<void>;
    updateStatus: (status: Status) => Promise<void>;
};

const useStatusStoreSlice: StateCreator<StatusStore> = () => ({
    getStatusBySpielerId: async (id: string): Promise<Status> => {
        const response = await getStatusBySpielerIdApi(id);
        return response.data;
    },
    getStatusBySemesterId: async (id: string): Promise<Status> => {
        const response = await getStatusBySemesterIdApi(id);
        return response.data;
    },
    createStatus: async (statusDto: StatusDto): Promise<void> => {
        const response = await createStatusApi(statusDto);
        return response.data;
    },
    updateStatus: async (status: Status): Promise<void> => {
        await updateStatusApi(status);
    },
});

type GlobalStore = AvatarStore & AufgabeStore & RoomStore & SpielerStore & StatusStore;

export const useGlobalStore = create<GlobalStore>((...fn) => ({
    ...useAvatarStoreSlice(...fn),
    ...useAufgabeStoreSlice(...fn),
    ...useRoomStoreSlice(...fn),
    ...useSpielerStoreSlice(...fn),
    ...useStatusStoreSlice(...fn),
}));
